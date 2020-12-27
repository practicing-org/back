import {Router} from 'express';
import reqFriend from './func/req friend';
const friend = Router();

friend.get('/friend/:friend', reqFriend);

export default friend;