import {Request, Response, NextFunction} from 'express';
import path from 'path';
import db from '../../../model/dbcon';
import {Op} from 'sequelize';

export default async (req:Request,res:Response, next:NextFunction)=>{//관계정의가 안됨 야발
    const {userId} = req.body;

    const query = "select * from board where `show` = 'all' or (`show` = 'me' and userId = :userId) or (`show` = 'friend' and userId = (select userId from friend where friend =:userId and userId = (select friend from friend where userId =:userId)))"
    try{
        let findboard:any;
        await db.sequelize.query(query, {replacements: {userId:userId}}, {raw:true}).then(
            function (result:any, metadata:any){
                for(let i = 0; i < result.length; i++){
                    result[i] = result[i][0];
                }
                findboard = result;
            }
        )

        for(let i = 0; i < findboard.length; i++){
            const user = await db.user.findOne({raw:true, attributes:["name"], where:{userId:findboard[i].userId}})
            let profile = await db.image.findOne({raw:true, attributes:["filename"], where:{userId:findboard[i].userId, profile:1}})

            if(profile === null){
                profile = {};
                profile.filename = 0;
            }

            findboard[i].user = {userName: user.name, profile:profile.filename};

            const boardImage = await db.image.findAll({raw:true, attributes:['filename'], where:{boardId:findboard[i].boardId}})
            console.log(boardImage);
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