import {Request, Response, NextFunction} from 'express';
import db from '../../../model/dbcon';
import crypto from 'crypto';

export default async(req:Request, res:Response, next:NextFunction)=>{
    let {hashPassword, changePassword}:any = req.query;
    let userId = req.body.userId;
    try{
        if(!userId|| !changePassword){
            console.log('userId is null');
            res.status(401).json({
                result:0,
                message:'you didn`t send your id'
            })
            return;
        }
        const finduser = await db.user.findOne({raw:true, where:{userId:userId,password:hashPassword}});
        if(finduser == null){
          console.log('userId is null');
          res.status(400).json({
              result:0,
              message:'존재하지 않는 유저'
          })
          return;
        }
    
        let HashChangePassword = crypto.createHash('sha256').update(changePassword).digest('hex');
        
        await db.user.update({password:HashChangePassword},{where:{userId:userId}})
        res.json({
            result:1,
            message:"성공",
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            result:0,
            message:"server has error now"
        })
    }
    
}