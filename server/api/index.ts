import {Router} from 'express';
import user from './user/user';
import board from './board/board';
import friend from './friend/friend';
import comments from './comments/comments'
const router = Router();

router.use(user, board, friend, comments);

export default router;
