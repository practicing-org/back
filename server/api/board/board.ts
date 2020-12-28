import {Router} from 'express';
import makeboard from './func/make board';
import authmiddleware from '../../middleware/auth';
import upload from '../../middleware/multer';
import showBoard from './func/show board';
const board = Router();

board.post('/board', authmiddleware.checkTokenForSignin, upload.array('files'), authmiddleware.checkTokenForSignin, makeboard)//upload 전 에서 req.body를 못 받아옴...하
board.get('/board', authmiddleware.checkTokenForSignin, showBoard);
export default board;