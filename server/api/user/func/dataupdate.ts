import {Request, Response, NextFunction} from 'express';
import db from '../../../model/dbcon';

export default async(req:Request, res:Response, next:NextFunction)=>{
    let {userId, name, hashPassword} = req.body;
    try{
        const finduser = await db.user.findOne({raw:true, where:{userId:userId}});
        if(!userId){
            console.log('userId is null');
            res.status(401).json({
                message:'you didn`t send your id'
            })
            return;
        }
        if(!hashPassword)
        hashPassword = finduser.password;
        if(!name)
            name = finduser.name;

        await db.user.update({name:name, password:hashPassword},{where:{userId:userId}})
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