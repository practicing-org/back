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
            res.status(400).json({
                result:0,
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
                    filename: file.location,
                    user_Id:user.user_Id,
                    profile:profile,
                    boardId:makeNewBoard.dataValues.boardId,
                })
            })
        }
        const findBoard = await db.board.findOne({raw:true, where:{boardId: makeNewBoard.dataValues.boardId}})
        let Profile = await db.image.findOne({raw:true, attributes:["filename"], where:{user_Id:findBoard.user_Id, profile:1}})
			
        if(Profile == null){
            Profile = {};
            Profile.filename = 0;
        }

        findBoard.user = {userName: user.name, profile:Profile.filename, gender:user.genderId};

        findBoard.canDelete = true;
        findBoard.likeNum = 0;
        findBoard.like = false;

        res.json({
            result:1,
            message:"성공",
            findBoard
        })
    }catch(err){
        console.log(err);
        res.status(502).json({
            result:0,
            message:"server has error now"
        })
        return;
    }
}