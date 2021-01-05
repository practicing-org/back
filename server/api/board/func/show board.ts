import {Request, Response, NextFunction} from 'express';
import path from 'path';
import db from '../../../model/dbcon';
import {Op, QueryTypes} from 'sequelize';

export default async (req:Request,res:Response, next:NextFunction)=>{//관계정의가 안됨 야발
    const {userId} = req.body;
    const query = "select * from board where `showId` = 'all' or (`showId` = 'me' and user_Id = :user_Id) or (`showId` = 'friend' and (user_Id = ANY(select user_Id from friend where friend =:user_Id and user_Id = ANY(select friend from friend where user_Id =:user_Id)) or user_Id = :user_Id))"
    try{
        let findboard:any;
        const user = await db.user.findOne({raw:true, where:{userId:userId}})
        await db.sequelize.query(query, {replacements: {user_Id:user.user_Id}}, { type: QueryTypes.SELECT }).then(
            function (result:any){
                result = result[0]
                for(let i = 0; i < result[0].length; i++){
                    
                    result[i] = result[i][0];
                    console.log(i);
                }
                findboard = result;
            }
        )
        
        for(let i = 0; i < findboard.length; i++){
            const user = await db.user.findOne({raw:true, attributes:["name"], where:{user_Id:findboard[i].user_Id}})
            let profile = await db.image.findOne({raw:true, attributes:["filename"], where:{user_Id:findboard[i].user_Id, profile:1}})

            if(profile === null){
                profile = {};
                profile.filename = 0;
            }

            findboard[i].user = {userName: user.name, profile:profile.filename};

            const boardImage = await db.image.findAll({raw:true, attributes:['filename'], where:{boardId:findboard[i].boardId}})
            findboard[i].images = boardImage;
        }

        console.log(findboard);

        res.json({
            findboard
        })
        
    } catch(err){
        console.log(err);
        res.status(500).json({
            message:"server has error now",
            result:0
        })
    }

}