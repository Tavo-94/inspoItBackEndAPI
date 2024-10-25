
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minLenght: 3
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    typeUser:{
        type: String,
        required:true
    },
    descripcion:{
        type: String,
        required: false
    },
    telefono:{
        type: String,
        required: false
    },
    sede: {
        type: String,
        required: false
    },
    profileImage:{
        type: String,
        required: false
    },
    portadaImage:{
        type: String,
        required: false
    },
    especialidad:{
        type: String,
        required: false
    }
})

const User = mongoose.model('User', userSchema);
export default User

