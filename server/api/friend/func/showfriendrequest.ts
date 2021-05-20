import {Request, Response, NextFunction} from 'express';
import db from '../../../model/dbcon';
import {QueryTypes} from 'sequelize';

export default async(req:Request, res:Response, next:NextFunction)=>{
    const {userId} = req.body;
    const {user_Ids}:any =req.query;
    const userIds = "("+user_Ids.join()+")";
    try{
        const user = await db.user.findOne({raw:true, where:{userId:userId}});
        const query = 'select user_Id, name,genderId, ifnull(0,filename)as profile from friend inner join user using(user_Id) left outer join file using(user_Id) where user_Id not in'+userIds+'friend =:user_Id and user_Id != ANY(select friend from friend where user_Id =:user_Id) desc limit 5'
        let findfriend = await db.sequelize.query(query, {replacements:{user_Id:user.user_Id},type:QueryTypes.SELECT, raw:true});
        res.json({
            result:1,
            message:"성공",
            findfriend
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            result:0,
            message:'server has error now'
        })
    }
}