import express from 'express';
import {send_tweet, all_tweets, my_tweets, like_tweet} from '../controllers/userController.js';

const router = express.Router();

router.get("/all_tweets", all_tweets);
router.get("/my_tweets", my_tweets);

router.post('/send_tweet', send_tweet); 
router.post('/like_tweet', like_tweet);

export default router;


