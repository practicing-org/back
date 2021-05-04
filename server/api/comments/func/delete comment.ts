import {Request, Response, NextFunction} from 'express';
import path from 'path';
import db from '../../../model/dbcon';


export default async (req:Request, res:Response, next:NextFunction)=>{
  const {userId} = req.body;
  const {commentsId} = req.query;
  if(commentsId == null){
    res.status(400).json({
      message:"null 불가능",
      result:0
    })
    return;
  }
  try{
    const user = await db.user.findOne({raw:true, where:{userId:userId}});
    const comment = await db.comments.findOne({raw:true, where:{commentsId:commentsId, user_Id:user.user_Id}});

    if(comment == null){
      res.status(400).json({
        message:"이 유저의 게시글이 아님",
        result:0
      })
      return;
    }

    await db.board.destroy({where:{commentsId:commentsId, user_Id:user.user_Id}});

    res.status(200).json({
      message:"성공",
      result:1,
      commentsId
    })
  }catch(err){
    console.log(err);
    res.status(500).json({
      message:"서버 에러",
      result:0
    })
  }

}