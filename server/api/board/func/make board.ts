import {Request, Response, NextFunction} from 'express';
import path from 'path';
import db from '../../../model/dbcon';


export default async (req:Request, res:Response, next:NextFunction)=>{
    const {userId, date, contents, profile, show} = req.body;
    const files:any = req.files;

    console.log(req.body, req.files)
    if(!userId || !date || (!contents&&!files) ||!show){
        console.log('client send null');
        res.status(400).json({
            message:"don't send null",
            result:0
        })
        return;
    }
    try{
        const user = await db.user.findOne({raw:true, where:{userId:userId}})
        const Show = await db.show.findOne({raw:true, where:{showId:show}});
        if(!Show){
            res.status(401).json({
                message:"server can't find showtype"
            })
            return;
        }
        const makeNewBoard = await db.board.create(
            {user_Id:user.user_Id, date:date, contents:contents, showId:show}
        )
        
        if(files[0]){
            if(profile == 1){
                await db.image.update({profile:0}, {where:{user_Id:user.user_Id, profile:1}})
            }
            files.map(async(file:any)=>{
                await db.image.create({
                    filename: "/image/"+file.filename,
                    user_Id:user.user_Id,
                    profile:profile,
                    boardId:makeNewBoard.dataValues.boardId,
                })
            })
        }
        res.json({
            result:1
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"server has error now"
        })
    }
}