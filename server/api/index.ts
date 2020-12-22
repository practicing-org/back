import {Router} from 'express';
import user from './user/user';
import board from './board/board';

const router = Router();

router.use(user, board);

export default router;
