import { Router } from 'express';
import hashmiddleware from '../../middleware/hash'
import signup from './func/signup'
import signin from './func/signin'
import auth from '../../middleware/auth'
const user = Router();

user.post('/signin', hashmiddleware.hash, signin, auth.makeToken);
user.post('/signup',hashmiddleware.hash, signup);
user.post('/autosignin',auth.checkToken, auth.makeToken);
    
export default user;