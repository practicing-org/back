import {Router} from 'express';
import user from './user/user';
import board from './board/board';
import friend from './friend/friend';

const router = Router();

router.use(user, board, friend);

export default router;
