import {Request, Response, NextFunction} from 'express';
import path from 'path';
import multer from 'multer';
import db from '../../../model/dbcon';
import user from '../../user/user';


export default async (req:Request, res:Response, next:NextFunction)=>{
    const {userId, title, date, contents, profile} = req.body;
    const files:any = req.files;
    console.log(path.join(__dirname, '..','..','..','upload',files[0].filename))
    if(!userId || !title || !date || (!contents&&!files[0].filename)){
        console.log('client send null');
        res.status(400).json({
            message:"don't send null",
            result:0
        })
    }
    try{
        const makeNewBoard = await db.board.create(
            {userId:userId, title:title, date:date, contents:contents}
        )
        if(files[0].filename){
            for(let i = 0; i < files.length; i++){
                await db.image.create({
                    filename:path.join(__dirname, '..','..','..','upload',files[i].filename),
                    userId:userId,
                    profile:profile,
                    boardId:makeNewBoard.dataValues.boardId,
                })
            }
            
        }
        res.json({
            result:1
        })
        console.log(makeNewBoard.dataValues.boardId);
        
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"server has error now"
        })
    }
}