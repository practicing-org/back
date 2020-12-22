import {Request, Response, NextFunction} from 'express';
import jsonwebtoken from 'jsonwebtoken';
import secret from './hashS.json';

const checkToken = async (req:Request, res:Response, next:NextFunction)=>{
    const token = req.headers['authorization'].replace(/^jsonwebtoken\s/, '');

    if(!token){
        return res.status(403).json({
            err:"notoken"
        })
    }
    try{
        const decodedToken:any = await jsonwebtoken.verify(JSON.parse(token), secret.secret, (err:any,DecodedToken:any)=>{
            
            if(err){
                console.log("err = \n", err);
                res.status(401).json({
                    message:"your token is wrong"
                })
            }
            console.log("userId = ", DecodedToken);
            req.body.userId = DecodedToken.sub;
            req.body.long = DecodedToken.long;
        })
        console.log(req.body);
        next();
    } catch(err){
        console.log(err);
        res.status(500).json({
            message:"server can't decode token"
        })
    }
    
}

const makeToken = async (req:Request, res:Response, next:NextFunction)=>{
    const {userId,long} = req.body;
    let day:number = 1;
    if(long == 1){
        day = 30;
    }
    try{
        let extime = Math.floor(Date.now() / 1000) + (day * 24 * 60 * 60);
        jsonwebtoken.sign({
            sub:userId,
            long:long,
            iat: Math.floor(Date.now() / 1000),
            exp: extime
        }, secret.secret, (err:any,token:any)=>{
            if(err){
                console.log(err);
                res.status(500).json({
                    message:"server can't make token"
                })
            }else{
                console.log('server make token');
                res.json({
                    token,
                    message:"login success"
                })
            }

        })
    } catch(err){
        console.log(err);
        res.status(500).json({
            message:"server can't make token"
        })
    }
}

export default {checkToken, makeToken};
