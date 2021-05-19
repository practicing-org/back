import {Request, Response, NextFunction} from 'express';
import db from '../../../model/dbcon';

export default async(req:Request, res:Response, next:NextFunction)=>{
  const userId = req.body.userId;
  console.log("aaaa")
  try{
    let user = await db.user.findOne({raw:true,attributes:["user_Id","name","genderId"], where:{userId:userId}});
    let profile = await db.image.findOne({raw:true,
      attributes:[["filename","profile"]],
      where:{user_Id:user.user_Id, profile:1}
    })

    if(!profile){
      profile = {};
      profile.profile = 0;
    }

    user.profile = profile.profile;

    res.json({
      result:1,
      message:"성공",
      user
    })
  }catch(err){
    console.log(err);
    res.status(500).json({
      result:0,
      message:"server has error now"
    })
  }
  
  
}