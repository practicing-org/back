import { Request, Response, NextFunction} from 'express';
import db from '../../../model/dbcon'

export default async(req:Request, res:Response, next:NextFunction)=>{
  const {userId} = req.query;
  if(userId == ''){
    console.log('userId can`t be null')
    res.status(400).json({
      result:0,
      message:"userId can't be null"
    })
    return
  }
  try{
    const findUserId = await db.user.findOne({raw:true, where:{userId:userId}})
    if(findUserId){
      console.log('userId is a duplicate')
      res.status(200).json({
        result:0,
        message:"이미 존재하는 아이디 입니다."
      })
      return
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