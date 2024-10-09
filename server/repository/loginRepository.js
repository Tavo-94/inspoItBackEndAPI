import User from '../models/User.model.js';
import bcrypt from 'bcryptjs/dist/bcrypt.js';

const login = async ({email, password})=>{
    let login = {email: false, password: false}
    const usuario = await User.findOne({email: email})
    if(usuario){
        const isPasswordValid = await bcrypt.compare(password, usuario.password);

        if(isPasswordValid){
            return await {access: true}
        }else{
            return await {access: false}
        }
    }else{
        return await {access: false}
    }
}


export default {login}