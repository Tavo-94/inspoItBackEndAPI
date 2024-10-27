import User from '../models/User.model.js';


//! la capa del repositorio solo se encarga de interactuar con la DB
const createUser = async (userData) => {
    return await User.create(userData);
}

const getAllUsers = async () => {
    return await User.find().populate('proyectos');
}

const getUserById = async (id) => {
    const userFromDb = await User.findById(id).populate('proyectos');
    console.info(userFromDb);
    return userFromDb;
}

const updateUser = async (id, userData) => {
    return await User.findByIdAndUpdate(id, userData, { new: true });
}

const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
}

export default { createUser, getAllUsers, getUserById, updateUser, deleteUser };

