import {Request, Response, NextFunction} from 'express';
import db from '../../../model/dbcon';

export default async (req:Request, res:Response, next:NextFunction)=>{
const {userId, hashPassword, name, birthday, genderId} = req.body;

if(!userId || !hashPassword || !name || !birthday || !genderId){
console.log('signup can`t get null');
res.status(403).json({
    message:'you send null',
    result:0
})
return;
}
try {
const finduser = await db.user.findOne({raw:true, where:{userId:userId}});
const findGender = await db.gender.findOne({raw:true, where:{genderId:genderId}})
if(finduser){
    console.log('user is already exist');
    res.status(401).json({
        message:'user is already exist',
        result:0
    })
    return;
}
await db.user.create({userId:userId, password:hashPassword, name:name, birthday:birthday, genderId:genderId})
res.json({
    result:1
})

} catch (err){
console.log(err);
res.status(500).json({
    result:0,
    message:'server has error now'
})
}
}
