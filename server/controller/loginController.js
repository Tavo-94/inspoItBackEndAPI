import validatorLogin from "../service/validatorLogin.js"
import jsonwebtoken from "jsonwebtoken";

const key = process.env.JWT_SECRET
const jwt = jsonwebtoken

const login = async (req, res) => {
    const usuario = req.body


    try {
        const user = await validatorLogin.login(usuario)
        
        const token = jwt.sign({id: user.id}, key, {
            expiresIn: 90000
        })

        
        if (user.access) {
            res.status(201).json({
                data: user,
                token: token
            })
        } else {
            res.status(401).json({
                access: user.access,
                message: user.message
            })
        }


    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}


export default { login }