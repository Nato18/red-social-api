import DataTypes from 'sequelize';
import db from '../config/db.js';

const Tweet_like = db.define('tweet_likes',{
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true
    },
    tweet_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true
    }
},{
    tableName: 'tweet_likes',
    timestamps: false
});

export default Tweet_like;