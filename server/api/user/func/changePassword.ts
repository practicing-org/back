import {Request, Response, NextFunction} from 'express';
import db from '../../../model/dbcon';
import crypto from 'crypto';

export default async(req:Request, res:Response, next:NextFunction)=>{
    let {password, changePassword}:any = req.query;
    let userId = req.body.userId;
    try{
        if(!userId|| !changePassword || !password){
            console.log('userId is null');
            res.status(400).json({
                result:0,
                message:'you send null'
            })
            return;
        }

        let hashPassword = crypto.createHash('sha256').update(password).digest('hex');

        const finduser = await db.user.findOne({raw:true, where:{userId:userId}});
        console.log(finduser);
        if(finduser == null){
          console.log('findUser is null');
          res.status(400).json({
              result:0,
              message:'존재하지 않는 유저'
          })
          return;
        }
        if(finduser.password != hashPassword){
            console.log('비밀 번호가 다름');
          res.status(400).json({
              result:0,
              message:'비밀 번호가 다름'
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