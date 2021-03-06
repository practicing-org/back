import {Router} from 'express';
import reqFriend from './func/req friend';
import showFriend from './func/showfriend';
import showFriendRequest from './func/showfriendrequest';
import auth from '../../middleware/auth';
import rejectRequest from './func/reject friend request';
const friend = Router();

friend.delete('/friend', auth.checkTokenForSignin, rejectRequest);
friend.post('/friend', auth.checkTokenForSignin, reqFriend);
friend.get('/friend/show/:user_Id', auth.checkTokenForSignin, showFriend);
friend.get('/friend/show/requset', auth.checkTokenForSignin, showFriendRequest);
export default friend;