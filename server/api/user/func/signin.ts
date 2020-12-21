import {Request, Response, NextFunction} from 'express';
import db from '../../../model/dbcon';

export default async(req:Request, res:Response, next:NextFunction)=>{
    const {userId, hashPassword} = req.body;
    if(!userId && !hashPassword){
        console.log('you send null');
        res.status(400).json({
            message:"you send null",
            result:"0"
        })
    }
    try{
        const finduser = await db.user.findOne({raw:true,where:{userId:userId}});
        if(!finduser){
            console.log("id is wrong");
            res.status(401).json({
                message:"server can`t find your id",
                result:"0"
            })
        }
        if(finduser.password != hashPassword){
            console.log("password is wrong")
        res.status(401).json({
            message:"password is wrong",
            result:0
        })
        }
        console.log("signin success");
        next();
        
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"server has error now"
        })
    }
}
    