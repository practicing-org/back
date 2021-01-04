import {Router} from 'express';
import auth from '../../middleware/auth';
import searchBoard from './func/searchboard';

const search = Router();

search.get('/search/board/:board', auth.checkTokenForSignin, searchBoard);
export default search;