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
            result:0
        })
        return;
    }

    try{
        const user = await db.user.findOne({raw:true, where:{userId:userId}})

        console.log(user);
        const [findFriendUserId,findFriendFriend] = await Promise.all([db.friend.findOne({raw:true, where:{user_Id:user.user_Id, friend:friendId}}),db.friend.findOne({raw:true, where:{user_Id:friendId, friend:user.user_Id}})]);
        console.log(findFriendUserId, findFriendFriend)
        if(!findFriendUserId){
            await db.friend.create({user_Id:user.user_Id, friend:friendId, date:Date.now()});
        }
        else if(findFriendUserId&&!findFriendFriend){
            await db.friend.destroy({where:{user_Id:user.user_Id, friend:friendId}})
        }
        else if(findFriendUserId&&findFriendFriend){
            await db.friend.destroy({where:{[Op.or]:[{user_Id:user.user_Id, friend:friendId}, {user_Id:friendId, friend:user.user_Id}]} })
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