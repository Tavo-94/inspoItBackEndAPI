import loginRepository from "../repository/loginRepository.js"

const login = async(user)=>{
    return await loginRepository.login(user)
}


export default {login}