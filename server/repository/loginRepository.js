import User from '../models/User.model.js';
import bcrypt from 'bcryptjs/dist/bcrypt.js';

const login = async (user)=>{
    console.log(user)
    const {email, password} = user
    const usuario = await User.findOne({email: email})
    
    if(usuario){
        const isPasswordValid = await bcrypt.compare(password, usuario.password);

        if(isPasswordValid){
            return await {access: true, id: usuario.id, name: usuario.name}
        }else{
            return await {access: false, message: "correo o contraseña invalido"}
        }
    }else{
        return await {access: false, message: "correo o contraseña invalido"}
    }
}


export default {login}