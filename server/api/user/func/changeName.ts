import {Request, Response, NextFunction} from 'express';
import db from '../../../model/dbcon';

export default async(req:Request, res:Response, next:NextFunction)=>{
    let {name} = req.body;
    let userId = req.body.userId;
    console.log(name);
    try{
        const finduser = await db.user.findOne({raw:true, where:{userId:userId}});
        if(finduser == null){
            console.log('userId is null');
            res.status(400).json({
                message:'존재하지 않는 유저'
            })
            return;
        }
        if(!userId|| !name){
            console.log('userId is null');
            res.status(400).json({
                message:'you send null'
            })
            return;
        }
        await db.user.update({name:name},{where:{userId:userId}})
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