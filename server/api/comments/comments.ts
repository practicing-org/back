import {Router} from 'express';
import writeComments from './func/writeComments';
import auth from '../../middleware/auth'
import showcomments from './func/showcomments'
import upload from '../../middleware/multer';

const comments = Router();

comments.post('/comments', auth.checkTokenForSignin,upload.single('file'), auth.checkTokenForSignin, writeComments);
comments.get('/comments', auth.checkTokenForSignin, showcomments);

export default comments;