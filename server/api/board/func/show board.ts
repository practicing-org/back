import {Request, Response, NextFunction} from 'express';
import path from 'path';
import db from '../../../model/dbcon';

export default async (req:Request,res:Response, next:NextFunction)=>{
    const {userId} = req.body;
    try{
        let findboard = await db.board.findAll({raw:true})
        console.log(findboard);
        console.log(findboard.length);
        for(let i = 0; i < findboard.length; i++){
            const user = await db.user.findOne({raw:true, attributes:["name"], where:{userId:findboard[i].userId}})
            let profile = await db.image.findOne({raw:true, attributes:["filename"], where:{userId:findboard[i].userId, profile:1}})
            console.log(user);
            console.log(profile);
            if(profile === null){
                profile = {};
                profile.filename = 0;
            }
            findboard[i].user = {userName: user.name, profile:profile.filename};
            const boardImage = await db.image.findAll({raw:true, attributes:['filename'], where:{boardId:findboard[i].boardId}})
            console.log(boardImage);
            findboard[i].images = boardImage;
        }
        console.log(findboard);
        res.json({
            findboard
        })
    } catch(err){
        console.log(err);
        res.status(500).json({
            message:"server has error now",
            result:0
        })
    }

}