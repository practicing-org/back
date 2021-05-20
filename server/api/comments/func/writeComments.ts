import {Request, Response, NextFunction} from 'express';
import db from '../../../model/dbcon';
import path from 'path';

export default async(req:Request, res:Response, next:NextFunction)=>{
    const {userId, comment, boardId} = req.body;
    const file:any = req.file;

    if(!userId||!comment||!boardId){
        console.log("client send null");
        res.status(400).json({
            message:"client send null",
            result:0
        })
        return;
    }
    try{
        const user = await db.user.findOne({raw:true, where:{userId:userId}});
        const writeComments = await db.comments.create({user_Id:user.user_Id, comment:comment, boardId:boardId});
        if(file){
            await db.image.create({
                filename: file.location,
                user_Id:user.user_Id,
                profile:0,
                commentsId:writeComments.dataValues.boardId,
            })
        }
        res.json({
            result:1,
            message:"성공",
        })
    } catch(err){
        console.log(err);
        res.status(500).json({
            result:0,
            message:"server has error now"
        })
    }
}