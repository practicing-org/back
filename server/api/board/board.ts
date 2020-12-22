import {Router} from 'express';
import makeboard from './func/make board';
import authmiddleware from '../../middleware/auth';
import upload from '../../middleware/multer';

const board = Router();

board.post('/board', authmiddleware.checkToken, upload.single('files'), makeboard)

export default board;