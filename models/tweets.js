import DataTypes from 'sequelize';
import db from '../config/db.js';


const Tweets = db.define('tweets',{
    tweet_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'user_id'
        }
    },
    tweet_text: {
        type:DataTypes.STRING(300),
        allowNull: false,
    },
    num_likes:{
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    num_retwets: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    num_comments: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
},{
    tableName: 'tweets',
    timestamps: false
});

export default Tweets;