import {Router} from 'express';
import user from './user/user';
import board from './board/board';
import comments from './comments/comments'
import search from './search/search'
const router = Router();

router.use(user, board, comments, search);

export default router;
