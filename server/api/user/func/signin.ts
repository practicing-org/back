import {Request, Response, NextFunction} from 'express';
import db from '../../../model/dbcon';

export default async(req:Request, res:Response, next:NextFunction)=>{
    const {userId, hashPassword} = req.body;
    console.log(userId, hashPassword)
    if(userId == '' || hashPassword == ''){
        console.log('you send null');
        res.status(400).json({
            message:"you send null",
            result:0
        })
        return;
    }
    try{
        const finduser = await db.user.findOne({raw:true,where:{userId:userId}});
        console.log(finduser)
        if(!finduser){
            console.log("id is wrong");
            res.status(401).json({
                message:"server can`t find your id",
                result:0
            })
            return;
        }
        console.log(finduser.password);
        console.log(hashPassword)
        if(finduser.password == hashPassword){
            console.log("signin success");
            next();
        }else{
            console.log("password is wrong")
            res.status(401).json({
                message:"password is wrong",
                result:0
            })
            return;
        }
        
        
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"server has error now",
            result:0
        })
    }
}
    