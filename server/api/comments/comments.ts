import {Router} from 'express';
import writeComments from './func/writeComments';
import auth from '../../middleware/auth';
import showComments from './func/showcomments';
import likeComments from './func/like comments';
import upload from '../../middleware/multer';

const comments = Router();

comments.post('/comments', auth.checkTokenForSignin,upload.single('file'), auth.checkTokenForSignin, writeComments);
comments.get('/comments', auth.checkTokenForSignin, showComments);
comments.post('/comments/like/:commentsId', auth.checkTokenForSignin, likeComments);

export default comments;