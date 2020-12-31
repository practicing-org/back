import {Router} from 'express';
import reqFriend from './func/req friend';
import showFriend from './func/showfriend';
import showFriendRequest from './func/showfriendrequest';
import auth from '../../middleware/auth';
const friend = Router();

friend.get('/friend/:friend', reqFriend);
friend.get('/showfriend/:user_Id', auth.checkTokenForSignin, showFriend);
friend.get('showfriendrequset', auth.checkTokenForSignin, showFriendRequest);
export default friend;