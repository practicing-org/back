import {Request, Response, NextFunction} from 'express';
import db from '../../../model/dbcon';
import {QueryTypes} from 'sequelize';


export default async(req:Request, res:Response, next:NextFunction)=>{
    const {user_Id} = req.params;

    try{
        const query = 'select user_Id, name, ifnull(0,filename)as profile from friend inner join user using(user_Id) left outer join file using(user_Id) where friend =:user_Id and user_Id = ANY(select friend from friend where user_Id =:user_Id)'
        let findfriend = await db.sequelize.query(query, {replacements:{user_Id:user_Id},type:QueryTypes.SELECT, raw:true});
        res.json({
            findfriend
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:'server has error now'
        })
    }
}