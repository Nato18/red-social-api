import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';
import {generarJWT} from '../helpers/tokens.js'

const register = async (req, res) =>{
    const { user, email, first_name, last_name, phonenumber,password} = req.body;
    console.log(req.body);
    try{
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);
        const queryUser = await User.create({ user_handle: user, email_address: email, first_name, last_name, phonenumber, password: hashPass});
        queryUser.save();
        
        res.send({success:true});
    
    }catch(error){
        console.log(error);
    }
}

const login = async (req, res) =>{
    const {correo, pass} = req.body
    try{
        const queryUser = await User.findOne({ where: {
            email_address: correo
        }})
        if(queryUser){
            let descrypt = bcrypt.compareSync(pass, queryUser.password);
            if(descrypt){
                const token = generarJWT({user_id : queryUser.user_id, user_handle: queryUser.user_handle});
                const {user_handle, user_id, email_address, first_name, last_name, phonenumber } = queryUser;
                const userData = {user_handle: user_handle, user_id: user_id, email_address: email_address, first_name: first_name, last_name: last_name, phonenumber: phonenumber };
                res.send({
                    sucess:true,
                    token,
                    userData
                })
            }else{
                res.send({
                    sucess:false,
                    data: 'Correo o Contraseña Incorrectos'
                })
            }
        }else{
            res.send({
                sucess:false,
                data: 'Correo o Contraseña Incorrectos'
            })
        }
    }catch(error){
        console.log(error);
    }
}


export {login, register}