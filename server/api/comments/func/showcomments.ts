import {Request, Response, NextFunction} from 'express';
import { Sequelize } from 'sequelize';
import db from '../../../model/dbcon';
import comments from '../comments';


export default async(req:Request, res:Response, next:NextFunction)=>{
    let {boardId, commentsId} = req.body;
    console.log(req.body);
    if(!boardId){
        console.log('you send null');
        res.status(401).json({
            result:0,
            message:"client send null"
        })
    }
    if(!commentsId){
        commentsId = null
    }
    
    try{
        let comments = await db.comments.findAll({raw:true, include:[{model:db.image, required: false, attributes:["filename"]},
        ], where:{boardId:boardId, FcommentsId:commentsId}});
        
        for(let i = 0; i < comments.length; i++){
            const user = await db.user.findOne({raw:true, attributes:["user_Id","name"], where:{user_Id:comments[i].user_Id}})
            let profile = await db.image.findOne({raw:true, attributes:["filename"], where:{user_Id:comments[i].user_Id, profile:1}})

            if(profile === null){
                profile = {};
                profile.filename = 0;
            }
            comments[i].user = {name:user.name, profile:profile.filename}

            let childComments = await db.comments.findOne({raw:true, attributes:[[Sequelize.fn('COUNT', Sequelize.col('*')), 'child']], where:{FcommentsId: comments[i].commentsId}})
            comments[i].childComments = childComments.child

            let likeNum = await db.like.findOne({raw:true, attributes:[[Sequelize.fn('COUNT', Sequelize.col('*')), 'number']], where:{commentsId: comments[i].commentsId}})
            comments[i].likeNum = likeNum.number;

            const like = await db.like.findOne({raw:true, where:{user_Id:user.user_Id, commentsId:comments[i].commentsId}})
            comments[i].like = !!like;
        }
        res.json({
            comments
        })
    } catch(err){
        console.log(err);
        res.status(500).json({
            message:"server has error now"
        })
    }
    
}