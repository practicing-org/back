import { Router } from 'express';
import hashmiddleware from '../../middleware/hash'
import signup from './func/signup'
import signin from './func/signin'
import auth from '../../middleware/auth'
import dataupdate from './func/dataupdate'
const user = Router();

user.post('/signin', hashmiddleware.hash, signin, auth.makeTokenForSignin);
user.post('/signup',hashmiddleware.hash, signup);
user.post('/autosignin',auth.checkTokenForSignin, auth.makeTokenForSignin);
user.get('/createTokenForUpdate', hashmiddleware.hash, signin, auth.makeTokenForDataUpdate);
user.put('/userDataUpdate', hashmiddleware.hash, auth.checkTokenForDataUpdate, dataupdate);
export default user;