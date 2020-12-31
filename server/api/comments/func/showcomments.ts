import {Request, Response, NextFunction} from 'express';
import db from '../../../model/dbcon';
import comments from '../comments';


export default async(req:Request, res:Response, next:NextFunction)=>{
    let {boardId, commentsId} = req.body;
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
        const comments = await db.comments.findAll({raw:true, include:[{model:db.image, required: false, attributes:["filename"]}], where:{boardId:boardId, FcommentsId:commentsId}});
        
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