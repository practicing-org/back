import {Request, Response, NextFunction} from 'express';

import db from '../../../model/dbcon';
import {QueryTypes, Sequelize} from 'sequelize';

export default async (req:Request,res:Response, next:NextFunction)=>{
	
	let boardIds:any = req.query.boardIds;
	boardIds = JSON.parse(boardIds);
	const userId = req.body.userId;
	console.log(boardIds)
	if(!boardIds){
		console.log('you send null');
		res.status(401).json({
				result:0,
				message:"client send null"
		})
		return;
	}
	const board_Ids = "("+boardIds.join()+")";
	console.log(board_Ids)
	//공계범위가 전체인 글과 친구의 글 내가쓴 글에서 이미 로드된 글을 제외한 20글들  
	const query = "select board.*, GROUP_CONCAT(file.filename) as images from board left outer join file using(boardId) where board.boardId not in"+board_Ids+" GROUP BY board.boardId order by boardId desc limit 4"

	try{
		
		const user = await db.user.findOne({raw:true, where:{userId:userId}})
		let findBoard = await db.sequelize.query(query, {type: QueryTypes.SELECT })
	if(!findBoard){
		findBoard = [];
	}
	for(let i = 0; i < findBoard.length; i++){
			//userName and profile
			const boardUser = await db.user.findOne({raw:true, attributes:["name","genderId"], where:{user_Id:findBoard[i].user_Id}})
			let profile = await db.image.findOne({raw:true, attributes:["filename"], where:{user_Id:findBoard[i].user_Id, profile:1}})
			
			if(profile == null){
				profile = {};
				profile.filename = 0;
			}

			findBoard[i].user = {userName: boardUser.name, profile:profile.filename, gender:user.genderId};

			findBoard[i].canDelete = false;

			if(findBoard[i].user_Id == user.user_Id){
				findBoard[i].canDelete = true;
			}
			// const boardImage = await db.image.findAll({raw:true, attributes:['filename'], where:{boardId:findBoard[i].boardId}})
			// findBoard[i].images = boardImage;
			
			let likeNum = await db.like.findOne({raw:true, attributes:[[Sequelize.fn('COUNT', Sequelize.col('*')), 'number']], where:{boardId: findBoard[i].boardId}})
			findBoard[i].likeNum = likeNum.number;


			const like = await db.like.findOne({raw:true, where:{user_Id:user.user_Id, boardId:findBoard[i].boardId}})
			findBoard[i].like = !!like;
		}

		res.json({
			result:1,
      message:"성공",
			findBoard
		})
		
	} catch(err){
		console.log(err);
		res.status(500).json({
			message:"server has error now",
			result:0
		})
	}

}