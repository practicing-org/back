import {Request, Response, NextFunction} from 'express';
import db from '../../../model/dbcon';

import {Op, Sequelize} from 'sequelize';

export default async(req:Request, res:Response, next:NextFunction)=>{
  const {boardIds}:any = req.body;
  const {userId} = req.body;
  let board = req.params.board;
  if(!board||!userId||!boardIds){
    console.log('you send null');
    res.status(401).json({
      result:0,
      message:'you send null'
    })
  }

  let valueArray = board.split(' ');
  let value = '';
  value = valueArray.join('|');
  console.log(valueArray);
  
  try{
    const User = await db.user.findOne({raw:true, attributes:['user_Id'], where:{userId:userId}})

    let findBoard = await db.board.findAll({raw:true, where:{boardId:{[Op.notIn]:boardIds},
      [Op.or]:[{contents:{[Op.regexp]:value}}, {title:{[Op.regexp]:value}}]
    }, replacements:{user_Id:User.user_Id},order:[["boardId","desc"]], limit:5})

    for(let i = 0; i < findBoard.length; i++){
      const user = await db.user.findOne({raw:true, attributes:["name"], where:{user_Id:findBoard[i].user_Id}})
      let profile = await db.image.findOne({raw:true, attributes:["filename"], where:{user_Id:findBoard[i].user_Id, profile:1}})

      if(profile === null){
          profile = {};
          profile.filename = 0;
      }

      findBoard[i].user = {userName: user.name, profile:profile.filename};


			if(findBoard[i].user_Id == User.user_Id){
				findBoard[i].canDelete = true;
			}else{
				findBoard[i].canDelete = false;
			}

      const boardImage = await db.image.findAll({raw:true, attributes:['filename'], where:{boardId:findBoard[i].boardId}})
      findBoard[i].images = boardImage;

      let likeNum = await db.like.findOne({raw:true, attributes:[[Sequelize.fn('COUNT', Sequelize.col('*')), 'number']], where:{boardId: findBoard[i].boardId}})
			findBoard[i].likeNum = likeNum.number;


			const like = await db.like.findOne({raw:true, where:{user_Id:User.user_Id, boardId:findBoard[i].boardId}})
			findBoard[i].like = !!like;
    }

    res.json({
      result:1,
      message:"성공",
      findBoard
    })
  }catch(err){
    console.log(err);
    res.status(500).json({
      result:0,
      message: 'server has error now'
    })
  }
  
}