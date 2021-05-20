import {Request,Response,NextFunction} from 'express';
import db from '../../../model/dbcon'

export default async(req:Request, res:Response,next:NextFunction)=>{
  const userId:string = req.body.userId;
  const boardId:string = req.params.boardId;

  if(!boardId||!userId){
    console.log("client send null");
    res.status(401).json({
      result:0,
      message:"client send null"
    })
  }

  try{
    const user = await db.user.findOne({raw:true, where:{userId:userId}});
    const like = await db.like.findOne({raw:true, where:{boardId:boardId, user_Id:user.user_Id}});

    if(!like){
      await db.like.create({user_Id:user.user_Id, boardId:boardId})
    }else{
      await db.like.destroy({where:{user_Id:user.user_Id, boardId:boardId}})
    }

    res.json({
      result:1,
      message:"성공"
    })
  }catch(err){
    console.log(err);
    res.status(500).json({
      result:0,
      message:"server has error now"
    })
  }
}