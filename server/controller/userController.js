import userService from '../service/userService.js';

//TODO en el controller solo validar que los datos recibidos son correctos

//! no es necesario validar que los datos de entrada sean los ideales
//! ej: si el email no es unico, es responsabilidad del service validarlo

const createUser = async (req, res) => {
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

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving users",
            error: error.message
        })
    }
}

const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userService.getUserById(userId);
        res.status(200).json({
            success: true,
            message: "User retrieved successfully",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving user",
            error: error.message
        })
    }
}
const updateUser = async (req, res) => {

    try {
        const userData = req.body;
        const userId =  req.params.id;
        
        const updateUser = await userService.updateUser(userId, userData);
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updateUser
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating user",
            error: error.message
        })
    }
}



const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await userService.deleteUser(userId);
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: deletedUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting user",
            error: error.message
        })
    }
}

export default { createUser, getAllUsers, getUserById, updateUser, deleteUser }