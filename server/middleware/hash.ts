import {Request, Response, NextFunction} from 'express';
import crypto from 'crypto';
import secrete from './hashS.json';

const hash = async (req:Request, res:Response, next:NextFunction) =>{
    try{
        const password = req.body.password;
        if(!password){
            console.log('password is null');
            res.status(400).json({
                message:'password is null'
            })
        } 
        const Secrete:string  = secrete.secret;
        req.body.hashPassword = await crypto.createHash('sha256', password).update(Secrete).digest('hex');
        next();
    }catch(err){
        console.log(err);
    }
}

export default {hash}
