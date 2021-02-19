import {Request, Response, NextFunction} from 'express';
import db from '../../../model/dbcon';
import {Op} from 'sequelize';

export default async(req:Request, res:Response, next:NextFunction)=>{
    const userId = req.body.userId;
    const friendId = req.body.friend;
    console.log(userId, friendId);
    if(!userId && !friendId){
        console.log('client send null');
        res.status(400).json({
            message:"you send null",
            result:1
        })
        return;
    }
    const date = new Date();
    try{
        const user = await db.user.findOne({raw:true, where:{userId:userId}})

        console.log(user);

        await db.friend.destroy({where:{user_Id:friendId, friend:user.user_Id}})

        res.json({
            result:1
        })
    } catch(err){
        console.log(err);
        res.status(500).json({
            message:"server has error now"
        })
    }
    
}