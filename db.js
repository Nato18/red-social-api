import Tweets from './models/tweets.js';
import User from './models/users.js';
import Tweet_like from './models/tweets_like.js';

const UserModel = User;
const TweetsModel = Tweets;
const TweetLikeModel = Tweet_like;

TweetsModel.belongsTo(UserModel,{
    as: 'byUser',
    foreignKey: 'user_id'
})

TweetsModel.belongsTo(TweetLikeModel,{
    as: 'myLike',
    foreignKey: 'tweet_id',
    targetKey: 'tweet_id'
})

export {UserModel, TweetsModel, TweetLikeModel}