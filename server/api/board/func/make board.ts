import {Request, Response, NextFunction} from 'express';
import path from 'path';
import multer from 'multer';
import db from '../../../model/dbcon';
import user from '../../user/user';


export default async (req:Request, res:Response, next:NextFunction)=>{
    const {userId, title, date, contents, profile, show} = req.body;
    console.log(req.body)
    const files:any = req.files;
    console.log(files);
    if(!userId || !title || !date || (!contents&&!files) ||!show){
        console.log('client send null');
        res.status(400).json({
            message:"don't send null",
            result:0
        })
        return;
    }
    try{
        const user = await db.user.findOne({raw:true, where:{userId:userId}})
        const Show = await db.show.findOne({raw:true, where:{show:show}});
        if(!Show){
            res.status(401).json({
                message:"server can't find showtype"
            })
            return;
        }
        const makeNewBoard = await db.board.create(
            {user_Id:user.user_Id, title:title, date:date, contents:contents, showId:show}
        )
        
        if(files[0]){
            if(profile == 1){
                await db.image.update({profile:0}, {where:{user_Id:user.user_Id, profile:1}})
            }
            for(let i = 0; i < files.length; i++){
                await db.image.create({
                    filename:path.join(__dirname, '..','..','..','upload',files[i].filename),
                    user_Id:user.user_Id,
                    profile:profile,
                    boardId:makeNewBoard.dataValues.boardId,
                })
            }
            
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