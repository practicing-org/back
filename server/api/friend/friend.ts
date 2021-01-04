import {Router} from 'express';
import reqFriend from './func/req friend';
import showFriend from './func/showfriend';
import showFriendRequest from './func/showfriendrequest';
import auth from '../../middleware/auth';
const friend = Router();

friend.post('/friend/:friend', reqFriend);
friend.get('/friend/show/:user_Id', auth.checkTokenForSignin, showFriend);
friend.get('/friend/show/requset', auth.checkTokenForSignin, showFriendRequest);
export default friend;