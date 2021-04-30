import {Router} from 'express';
import writeComments from './func/writeComments';
import auth from '../../middleware/auth';
import showComments from './func/showcomments';
import likeComments from './func/like comments';
import upload from '../../middleware/multer';
import deleteComments from './func/delete comment'

const comments = Router();

comments.post('/comments', auth.checkTokenForSignin,upload.single('file'), auth.checkTokenForSignin, writeComments);
comments.get('/comments', auth.checkTokenForSignin, showComments);
comments.post('/comments/like/:commentsId', auth.checkTokenForSignin, likeComments);
comments.delete('/comments',auth.checkTokenForSignin, deleteComments);

export default comments;