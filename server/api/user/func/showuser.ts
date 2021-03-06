import {Request, Response, NextFunction, } from 'express';
import db from '../../../model/dbcon';
import {QueryTypes, Sequelize, Op} from 'sequelize';

export default async(req:Request, res:Response, next:NextFunction)=>{
    let {boardIds }:any = req.query;
    let {selectuser}:any = req.params;

    console.log(boardIds)
    const userId = req.body.userId;

    boardIds = JSON.parse(boardIds);

    if(!userId||!selectuser||!boardIds){
        console.log('you send null');
        res.status(400).json({
            result:0,
            message:"you send null"
        })
    }
    const board_Ids = "("+boardIds.join()+")";
    
    try{
        const user = await db.user.findOne({raw:true, where:{userId:userId}});

        let selectUser = await db.user.findOne({raw:true,attributes:["user_Id","name","genderId"], where:{user_Id:selectuser}})
        console.log(selectUser);
        let profile = await db.image.findOne({raw:true, attributes:["filename"], where:{user_Id:selectuser, profile:1}})

        if(profile === null){
            profile = {};
            profile.filename = null;
        }
        selectUser.profile = profile.filename;

        if(user.user_Id == selectuser){
            let findBoard = await db.board.findAll({raw:true, where:{user_Id:selectUser.user_Id, boardId:{[Op.notIn]:boardIds}},order:[["boardId","desc"]], limit:5});
            for(let i = 0; i < findBoard.length; i++){

                findBoard[i].user = {userName: selectUser.name, profile:profile.filename,gender:user.genderId};

                findBoard[i].canDelete = true;

                const boardImage = await db.image.findOne({raw:true, attributes:[[Sequelize.fn('GROUP_CONCAT',Sequelize.col("filename")),'filename']], where:{boardId:findBoard[i].boardId}})
                findBoard[i].images = boardImage.filename;

                let likeNum = await db.like.findOne({raw:true, attributes:[[Sequelize.fn('COUNT', Sequelize.col('*')), 'number']], where:{boardId: findBoard[i].boardId}})
                findBoard[i].likeNum = likeNum.number;


                const like = await db.like.findOne({raw:true, where:{user_Id:user.user_Id, boardId:findBoard[i].boardId}})
                findBoard[i].like = !!like;
            }
            res.json({
                result:1,
                user:selectUser,
                myProfile:true,
                findBoard:findBoard
            })
            return;
        }
        
        
        //공계범위가 전체인 글과 친구의 글 내가쓴 글에서 이미 로드된 글을 제외한 20글들  
        const query = "select board.*, GROUP_CONCAT(file.filename) as images from board left outer join file using(boardId) where board.boardId not in"+board_Ids+" and board.user_Id = "+selectUser.user_Id+" GROUP BY board.boardId order by boardId desc limit 5"
        let findBoard:any;
        await db.sequelize.query(query, {replacements: {selectuser_Id:selectuser}}, { type: QueryTypes.SELECT }).then(
            function (result:any){
                console.log(result)
                result = result[0]
                findBoard = result;
            }
        )

        for(let i = 0; i < findBoard.length; i++){
            findBoard[i].user = {userName: selectUser.name, profile:profile.filename, gender:user.genderId};

            findBoard[i].canDelete = false;

            let likeNum = await db.like.findOne({raw:true, attributes:[[Sequelize.fn('COUNT', Sequelize.col('*')), 'number']], where:{boardId: findBoard[i].boardId}})
			findBoard[i].likeNum = likeNum.number;


			const like = await db.like.findOne({raw:true, where:{user_Id:user.user_Id, boardId:findBoard[i].boardId}})
			findBoard[i].like = !!like;
        }

        res.json({
            result:1,
            message:"성공",
            user:selectUser,
            myProfile:false,
            findBoard:findBoard
        })
        return;
    }catch(err){
        console.log(err);
        res.status(500).json({
            resuit:0,
            message:'server has error now'
        })
    }

}