import {Router} from 'express';
import writeComments from './func/writeComments';
import auth from '../../middleware/auth'
import update from '../../middleware/multer'
import upload from '../../middleware/multer';

const comments = Router();

comments.post('/comments', auth.checkTokenForSignin,upload.single('file'), auth.checkTokenForSignin, writeComments);

export default comments;