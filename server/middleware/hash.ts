import {Request, Response, NextFunction} from 'express';
import crypto from 'crypto';


const hash = async (req:Request, res:Response, next:NextFunction) =>{
    try{
        const password = req.body.password;
        console.log(password)
        if(!password){
            console.log('password is null');
            res.json({
                result:0,
                message:'password is null'
            })
            return;
        } 
        req.body.hashPassword = crypto.createHash('sha256').update(password).digest('hex');
        next();
    }catch(err){
        console.log(err);
    }
}

export default {hash}
