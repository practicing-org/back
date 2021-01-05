import {Router} from 'express';
import auth from '../../middleware/auth';
import searchBoard from './func/searchboard';
import searchUser from './func/searchUser';
const search = Router();

search.get('/search/board/:board', auth.checkTokenForSignin, searchBoard);
search.get('/search/user/:user', auth.checkTokenForSignin, searchUser);
export default search;