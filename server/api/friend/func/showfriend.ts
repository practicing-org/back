import {Request, Response, NextFunction} from 'express';
import db from '../../../model/dbcon';
import {QueryTypes} from 'sequelize';


export default async(req:Request, res:Response, next:NextFunction)=>{
    const {user_Id} = req.params;
    const user_Ids:any = req.query.user_Ids;
    const userIds = "("+user_Ids.join()+")";
    try{
        const query = 'select user_Id, name from friend inner join user using(user_Id) where user_Id not in'+userIds+'friend =:user_Id and user_Id = ANY(select friend from friend where user_Id =:user_Id) desc limit 10'
        let findfriend = await db.sequelize.query(query, {replacements:{user_Id:user_Id},type:QueryTypes.SELECT, raw:true});

        for(let i = 0; i < findfriend.length; i++){
            const query = 'select ifnull(0,filename) as profile from file where profile = 1 and user_Id = :user_Id';
            const profile = await db.sequelize.query(query, {replacements:{user_Id:findfriend[i].user_Id}, type:QueryTypes.SELECT, raw:true});
            findfriend[i].profile = profile.profile;
        }
        res.json({
            result:1,
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