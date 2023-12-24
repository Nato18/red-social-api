// import Tweets from '../models/tweets.js';
import {TweetsModel, UserModel, TweetLikeModel} from '../db.js';
import io from '../index.js';
const send_tweet = async (req, res) => {
    console.log(req.body);
    const { user_id, tweet_text } = req.body;
    try {
        const tweet = await TweetsModel.create(
            { user_id: user_id, tweet_text: tweet_text },
            {include: [{model: UserModel,as: 'byUser',}]}
        );
        await tweet.reload();
        io.emit('newTweet', tweet);
        res.send({ success: true });

    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, error: 'Error al enviar el tweet' });
    }
};

const all_tweets = async (req, res) =>{
    const {user_id} = req.query;
    console.log(user_id);
    try{
        const allTweet = await TweetsModel.findAll({
            order: [['tweet_id', 'DESC']],
            include: [
                { model: UserModel, as: 'byUser' },
                { model: TweetLikeModel, as: 'myLike', where: { user_id: user_id }, required: false }
            ]
        });
        console.log(allTweet);
        res.send({data:allTweet})
    }catch (error){
        console.log(error);
    }

};

const my_tweets = async (req ,res) => {
    const {user_id} = req.query
    try{
        const my_tweets = await TweetsModel.findAll({where: {user_id: user_id},include: [{model: UserModel, as: 'byUser'}] });
        res.send({data: my_tweets})
    }catch(error){
        console.log(error);
    }
};

const like_tweet = async (req, res) => {
    const {tweet_id, user_id} = req.body;

    try{
        const search_like = await TweetLikeModel.findOne({ where: {user_id: user_id, tweet_id: tweet_id}});
        const like_tweet = await TweetsModel.findByPk(tweet_id, {include: [{model: UserModel, as: 'byUser'}]});


        if(search_like == null ){
            const tweet_like = await TweetLikeModel.create({user_id: user_id, tweet_id: tweet_id});
            like_tweet.num_likes++;
            tweet_like.save();
            like_tweet.save();

        }else{
            like_tweet.num_likes--;
            like_tweet.save();
            search_like.destroy(); 

        }
        io.emit("newLike",like_tweet);
        res.send({ data: like_tweet});

    }catch(error){
        console.error(error);
    }
}
export {all_tweets, send_tweet, my_tweets, like_tweet}