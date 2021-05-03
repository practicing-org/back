import { Router } from 'express';
import hashmiddleware from '../../middleware/hash'
import signup from './func/signup'
import signin from './func/signin'
import auth from '../../middleware/auth'
import showuser from './func/showuser'
import idCheck from './func/idCheck'
import getUser from './func/getUser'
import changeName from './func/changeName'
import changePassword from './func/changePassword'
const user = Router();

user.post('/signin', hashmiddleware.hash, signin, auth.makeTokenForSignin);
user.post('/signup',hashmiddleware.hash, signup);
user.get('/user/idCheck',idCheck);
user.post('/autosignin',auth.checkTokenForSignin, auth.makeTokenForSignin);
user.get('/user/updateToken', auth.checkTokenForSignin, hashmiddleware.hash, signin, auth.makeTokenForDataUpdate);
user.put('/user/change/name', auth.checkTokenForSignin, changeName);
user.put("/user/change/password", auth.checkTokenForSignin, hashmiddleware.hash, changePassword);
user.get('/yourProfile', auth.checkTokenForSignin, getUser);
user.get('/user/:selectuser',auth.checkTokenForSignin, showuser);
export default user;