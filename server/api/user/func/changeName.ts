import {Request, Response, NextFunction} from 'express';
import db from '../../../model/dbcon';

export default async(req:Request, res:Response, next:NextFunction)=>{
    let {name} = req.query;
    let userId = req.body.userId;
    console.log(name);
    try{
        if(!userId|| !name){
            console.log('userId is null');
            res.status(400).json({
                result:0,
                message:'you send null'
            })
            return;
        }
        const finduser = await db.user.findOne({raw:true, where:{userId:userId}});
        if(finduser == null){
            console.log('finUser is null');
            res.status(400).json({
                result:0,
                message:'존재하지 않는 유저'
            })
            return;
        }
        
        await db.user.update({name:name},{where:{userId:userId}})
        res.json({
            result:1,
            message:"성공",
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            result:1,
            message:"성공",
        })
    }
    
}