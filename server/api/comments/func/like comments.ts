import {Request,Response,NextFunction} from 'express';
import db from '../../../model/dbcon'

export default async(req:Request, res:Response,next:NextFunction)=>{
  const userId = req.body.userId;
  const commentsId = req.params.commentsId;

  if(!commentsId||!userId){
    console.log("client send null");
    res.status(401).json({
      result:0,
      message:"client send null"
    })
  }

  try{
    const user = await db.user.findOne({raw:true, where:{userId:userId}});
    const like = await db.like.findOne({raw:true, where:{boardId:commentsId, user_Id:user.user_Id}});

    if(!like){
      await db.like.create({user_Id:user.user_Id, boardId:commentsId})
    }else{
      await db.like.destroy({where:{user_Id:user.user_Id, boardId:commentsId}})
    }

    res.json({
      result:1
    })
  }catch(err){
    console.log(err);
    res.status(500).json({
      result:0,
      message:"server has error now"
    })
  }
}