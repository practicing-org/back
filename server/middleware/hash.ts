import {Request, Response, NextFunction} from 'express';
import crypto from 'crypto';


const hash = async (req:Request, res:Response, next:NextFunction) =>{
    try{
        const password = req.body.password;

        if(!password){
            console.log('password is null');
            res.status(400).json({
                result:0,
                message:'password is null'
            })
            return;
        } 
        req.body.hashPassword = crypto.createHash('sha256').update(password).digest('hex');
        next();
    }catch(err){
        console.log(err);
        res.status(500).json({
            result:0,
            message:'password is null'
        })
        return;
    }
}

export default {hash}
