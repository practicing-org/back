import {Request, Response, NextFunction} from 'express';
import db from '../../../model/dbcon';
import {Op, Sequelize} from 'sequelize';

export default async(req:Request, res:Response, next:NextFunction)=>{
  const {user} = req.params;
  const {userId} = req.body;
  if(!user||!userId){
    console.log('you send null');
    res.status(401).json({
      result:0,
      message:'you send null'
    })
  }
  console.log(user);
  let valueArray = user.split(' ');
  let value = '';
  for(let i = 0; i < valueArray.length; i++){
    value += valueArray[i]+"|";
  }

  try{
    const User = await db.user.findOne({raw:true, attributes:['user_Id'], where:{userId:userId}})

    
    let findUser = await db.user.findAll({raw:true, attributes:['user_Id','name'], where:{name:{[Op.regexp]:value}}});
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
        findUser[i].relation = "nobody";
      }
      else if(findFriendUserId&&!findFriendFriend){//내가 친추 보냈을 때
          findUser[i].relation = "me send";
      }
      else if(!findFriendUserId&&findFriendFriend){//다른 사람이 친추를 보냈을 때
          findUser[i].relation = "other send"
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