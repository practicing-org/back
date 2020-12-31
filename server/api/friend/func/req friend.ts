import {Request, Response, NextFunction} from 'express';
import db from '../../../model/dbcon';
import {Op} from 'sequelize';
import user from '../../user/user';

export default async(req:Request, res:Response, next:NextFunction)=>{
    const userId = req.body.userId;
    const friendId = req.params.friend;
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
        const friend = await db.user.findOne({raw:true, where:{userId:friendId}})

        console.log(user, friend);
        const findFriendUserId = await db.friend.findOne({raw:true, where:{user_Id:user.user_Id, friend:friend.user_Id}})
        const findFriendFriend = await db.friend.findOne({raw:true, where:{user_Id:friend.user_Id, friend:user.user_Id}})
        console.log(findFriendUserId, findFriendFriend)
        if(!findFriendUserId){
            await db.friend.create({user_Id:user.user_Id, friend:friend.user_Id, date:Date.now()});
        }
        else if(findFriendUserId&&!findFriendFriend){
            await db.friend.destroy({where:{user_Id:user.user_Id, friend:friend.user_Id}})
        }
        else if(findFriendUserId&&findFriendFriend){
            await db.friend.destroy({where:{[Op.or]:[{user_Id:user.user_Id, friend:friend.user_Id}, {user_Id:friend.user_Id, friend:user.user_Id}]} })
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