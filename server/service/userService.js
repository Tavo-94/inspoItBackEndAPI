import userRepository from '../repository/userRepository.js';


//TODO sumar en el service la logica de negocio relacionada al user
//! ej: que no puedan existir dos usuarios con el mismo email
//! ej: que no puedan existir usuarios menores de edad
//! etc...


const createUser = async (userData) => {

    return await userRepository.createUser(userData);
}

const getAllUsers = async () => {
    return await userRepository.getAllUsers();
}

const getUserById = async (id) => {
    return await userRepository.getUserById(id);
}

const updateUser = async (id, userData) => {
    return await userRepository.updateUser(id, userData);
}

const deleteUser = async (id) => {
    return await userRepository.deleteUser(id);
}

export default { createUser, getAllUsers, getUserById, updateUser, deleteUser }