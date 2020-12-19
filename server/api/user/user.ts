import { Router } from 'express';
import hashmiddleware from '../middleware/hash'
import signup from '../api/user/signup'
const user = Router();

user.post('/signup',hashmiddleware.hash, signup);
    
export default user;