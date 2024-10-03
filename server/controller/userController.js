import userService from '../service/userService.js';

//TODO en el controller solo validar que los datos recibidos son correctos

//! no es necesario validar que los datos de entrada sean los ideales
//! ej: si el email no es unico, es responsabilidad del service validarlo

export const createUser = async (req, res) => {
    try {
        
        const userData = req.body;

        console.log(userData);

        const createdUser = await userService.createUser(userData);
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: createdUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating user",
            error: error.message
        })
    }
}

export default { createUser }