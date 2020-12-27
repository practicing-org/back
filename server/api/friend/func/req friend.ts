import {Request, Response, NextFunction} from 'express';
import db from '../../../model/dbcon';
import {Op} from 'sequelize';
import user from '../../user/user';

export default async(req:Request, res:Response, next:NextFunction)=>{
    const userId = req.body.userId;
    const friend = req.params.friend;
    console.log(userId, friend);
    if(!userId && !friend){
        console.log('client send null');
        res.status(400).json({
            message:"you send null",
            result:1
        })
        return;
    }
    const date = new Date();
    try{
        const findFriendUserId = await db.friend.findOne({raw:true, where:{userId:userId, friend:friend}})
        const findFriendFriend = await db.friend.findOne({raw:true, where:{userId:friend, friend:userId}})
        console.log(findFriendUserId, findFriendFriend)
        if(!findFriendUserId){
            await db.friend.create({userId:userId, friend:friend, date:Date.now()});
        }
        else if(findFriendUserId&&!findFriendFriend){
            await db.friend.destroy({where:{userId:userId, friend:friend}})
        }
        else if(findFriendUserId&&findFriendFriend){
            await db.friend.destroy({where:{[Op.or]:[{userId:userId, friend:friend}, {userId:friend, friend:userId}]} })
        }
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