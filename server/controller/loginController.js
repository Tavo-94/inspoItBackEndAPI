import validatorLogin from "../service/validatorLogin.js"

const login = async(req, res)=>{
    const usuario = req.body

    try {
        const user = await validatorLogin.login(usuario)
        res.status(201).json({
            data: user
        })
        
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}


export default {login}