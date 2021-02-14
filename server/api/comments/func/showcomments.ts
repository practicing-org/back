import {Request, Response, NextFunction} from 'express';
import { Sequelize } from 'sequelize';
import db from '../../../model/dbcon';
import {Op} from 'sequelize'
import { json } from 'body-parser';


export default async(req:Request, res:Response, next:NextFunction)=>{
    let {boardId, commentsId, comments_Ids}:any = req.query;
    const userId = req.body.userId;
    console.log(userId);
    if(!boardId||!comments_Ids){
        console.log('you send null');
        res.status(401).json({
            result:0,
            message:"client send null"
        })
    }
    if(!commentsId){
        commentsId = null
    }
    boardId = JSON.parse(boardId);
    commentsId = JSON.parse(commentsId);
    comments_Ids = JSON.parse(comments_Ids);
    try{
        const User = await db.user.findOne({raw:true, attributes:["user_Id"], where:{userId:userId}})
        let comments = await db.comments.findAll({raw:true, include:[{model:db.image, required: false, attributes:["filename"]}],
        where:{boardId:boardId, FcommentsId:commentsId, commentsId:{[Op.notIn]:comments_Ids}}, limit:5, order:[["commentsId","desc"]]});
        console.log(comments)
        for(let i = 0; i < comments.length; i++){
            const user = await db.user.findOne({raw:true, attributes:[["genderId","gender"],"name"], where:{user_Id:comments[i].user_Id}})
            let profile = await db.image.findOne({raw:true, attributes:["filename"], where:{user_Id:comments[i].user_Id, profile:1}})

            if(profile === null){
                profile = {};
                profile.filename = 0;
            }
            comments[i].user = {name:user.name, profile:profile.filename, gender:user.genderId}

            let childComments = await db.comments.findOne({raw:true, attributes:[[Sequelize.fn('COUNT', Sequelize.col('*')), 'child']], where:{FcommentsId: comments[i].commentsId}})
            comments[i].childComments = childComments.child

            let likeNum = await db.like.findOne({raw:true, attributes:[[Sequelize.fn('COUNT', Sequelize.col('*')), 'number']], where:{commentsId: comments[i].commentsId}})
            comments[i].likeNum = likeNum.number;

            const like = await db.like.findOne({raw:true, where:{user_Id:User.user_Id, commentsId:comments[i].commentsId}})
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