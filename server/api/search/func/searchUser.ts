import {Request, Response, NextFunction} from 'express';
import db from '../../../model/dbcon';
import {Op, Sequelize} from 'sequelize';

export default async(req:Request, res:Response, next:NextFunction)=>{
  const {user_Ids, user}:any = req.query;
  const userId:string = req.body.userId;
  if(!user||!userId||!user_Ids){
    console.log('you send null');
    res.status(401).json({
      result:0,
      message:'you send null'
    })
  }
  let valueArray = user.split(' ');
  let value = '';
  value = valueArray.join("|");

  try{
    const User = await db.user.findOne({raw:true, attributes:['user_Id'], where:{userId:userId}})

    
    let findUser = await db.user.findAll({raw:true, attributes:['user_Id','name'], where:{name:{[Op.regexp]:value}, user_Id:{[Op.notIn]:user_Ids}}, limit:5, order:[["user_Id","desc"]]});
    console.log(findUser);
    for(let i = 0;i < findUser.length; i++){
      let profile = await db.image.findOne({raw:true,
        attributes:[["filename","profile"]],
        where:{user_Id:findUser[i].user_Id, profile:1}
      })

      if(!profile){
        profile = {};
        profile.profile = 0;
      }

      findUser[i].profile = profile.profile;

      const findFriendUserId = await db.friend.findOne({raw:true, where:{user_Id:User.user_Id, friend:findUser[i].user_Id}})
      const findFriendFriend = await db.friend.findOne({raw:true, where:{user_Id:findUser[i].user_Id, friend:User.user_Id}})
      if(!findFriendUserId&&!findFriendFriend){//둘다 친추를 안 보냈을 때
        findUser[i].relation = "no";
      }
      else if(findFriendUserId&&!findFriendFriend){//내가 친추 보냈을 때
          findUser[i].relation = "me";
      }
      else if(!findFriendUserId&&findFriendFriend){//다른 사람이 친추를 보냈을 때
          findUser[i].relation = "you"
      }
      else{
          findUser[i].relation = "both"//둘다 친추 보냈을 때
      }
    }
    res.json({
      result:1,
      findUser
    })
  }catch(err){
    console.log(err);
    res.status(500).json({
      result:0,
      message:"server has error now"
    })
  }
}