import { Router } from 'express';
import hashmiddleware from '../../middleware/hash'
import signup from './func/signup'
import signin from './func/signin'
import auth from '../../middleware/auth'
import dataupdate from './func/dataupdate'
import showuser from './func/showuser'
const user = Router();

user.post('/signin', hashmiddleware.hash, signin, auth.makeTokenForSignin);
user.post('/signup',hashmiddleware.hash, signup);
user.post('/autosignin',auth.checkTokenForSignin, auth.makeTokenForSignin);
user.get('/user/updateToken', auth.checkTokenForSignin, hashmiddleware.hash, signin, auth.makeTokenForDataUpdate);
user.put('/user', hashmiddleware.hash, auth.checkTokenForDataUpdate, dataupdate);
user.get('/user/:user_Id',auth.checkTokenForSignin, showuser);
export default user;