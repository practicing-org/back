import {Request, Response, NextFunction} from 'express';

import db from '../../../model/dbcon';
import {QueryTypes, Sequelize} from 'sequelize';

export default async (req:Request,res:Response, next:NextFunction)=>{
	
	const {userId, boardIds} = req.body;
	const board_Ids = "("+boardIds.join()+")";
	//공계범위가 전체인 글과 친구의 글 내가쓴 글에서 이미 로드된 글을 제외한 20글들  
	const query = "select * from board where boardId not in"+board_Ids+"and (`showId` = 'all' or (`showId` = 'me' and user_Id = :user_Id) or (`showId` = 'friend' and (user_Id = ANY(select user_Id from friend where friend =:user_Id and user_Id = ANY(select friend from friend where user_Id =:user_Id)) or user_Id = :user_Id))) limit 20"

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
	console.log(findboard)
	
	for(let i = 0; i < findboard.length; i++){
			//userName and profile
			const boardUser = await db.user.findOne({raw:true, attributes:["name"], where:{user_Id:findboard[i].user_Id}})
			let profile = await db.image.findOne({raw:true, attributes:["filename"], where:{user_Id:findboard[i].user_Id, profile:1}})
			
			if(profile == null){
				profile.filename = 0;
			}

			findboard[i].user = {userName: boardUser.name, profile:profile.filename};

			const boardImage = await db.image.findAll({raw:true, attributes:['filename'], where:{boardId:findboard[i].boardId}})
			findboard[i].images = boardImage;

			let likeNum = await db.like.findOne({raw:true, attributes:[[Sequelize.fn('COUNT', Sequelize.col('*')), 'number']], where:{boardId: findboard[i].boardId}})
			findboard[i].likeNum = likeNum.number;


			const like = await db.like.findOne({raw:true, where:{user_Id:user.user_Id, boardId:findboard[i].boardId}})
			findboard[i].like = !!like;
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