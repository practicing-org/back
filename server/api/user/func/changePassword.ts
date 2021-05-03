import {Request, Response, NextFunction} from 'express';
import db from '../../../model/dbcon';
import crypto from 'crypto';

export default async(req:Request, res:Response, next:NextFunction)=>{
    let {hashPassword, changePassword} = req.body;
    let userId = req.body.userId;
    try{
        const finduser = await db.user.findOne({raw:true, where:{userId:userId,password:hashPassword}});
        if(finduser == null){
          console.log('userId is null');
          res.status(400).json({
              message:'존재하지 않는 유저'
          })
          return;
        }
        if(!userId|| !changePassword){
          console.log('userId is null');
          res.status(401).json({
              message:'you didn`t send your id'
          })
          return;
      }
        const HashChangePassword = crypto.createHash('sha256').update(changePassword).digest('hex');
        
        await db.user.update({password:HashChangePassword},{where:{userId:userId}})
        res.json({
            result:1
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"server has error now"
        })
    }
    
}