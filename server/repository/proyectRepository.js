import Proyect from "../models/Proyect.model.js";

const createProyect = async (proyectData) => {
  return await Proyect.create(proyectData);
};

const getAllProyects = async (filters, sortOptions) => {
  return await Proyect.find(filters).sort(sortOptions);
};

const getProyectById = async (id) => {
  return await Proyect.findById(id);
};

const getProyectByName = async (nombre) => {
  return await Proyect.find({
    nombre: { $regex: `^${nombre}`, $options: "i" },
  });
  // $regex busca coincidencia, $options 'i' hace la búsqueda insensible a mayúsculas/minúsculas, ^ para que muestre directamente por 1 letra
};

const updateProyect = async (id, proyectData) => {
  return await Proyect.findByIdAndUpdate(id, proyectData, { new: true });
};

const deleteProyect = async (id) => {
  return await Proyect.findByIdAndDelete(id);
};

export default {
  createProyect,
  getAllProyects,
  getProyectById,
  getProyectByName,
  updateProyect,
  deleteProyect,
};
