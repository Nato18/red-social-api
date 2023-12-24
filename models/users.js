import DataTypes from 'sequelize';
import db from '../config/db.js';


const User = db.define('users',{
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_handle: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    email_address: {
        type:DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    first_name:{
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(100),
        allowNull: false    
    },
    phonenumber: {
        type: DataTypes.STRING(10),
        unique: true
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
},{
    tableName: 'users',
    timestamps: false
});

export default User;