import Proyect from "../models/Proyect.model.js";
import proyectRepository from "../repository/proyectRepository.js";

// Crear un nuevo proyecto
const createProyect = async (req, res) => {
  const { fecha, estado = true, ...proyectData } = req.body; // asegura que `estado` esté en `true` si no se proporciona

  try {
    const newProyect = await Proyect.create({ estado, ...proyectData });
    res.status(201).json(newProyect);
  } catch (error) {
    res.status(400).send({ message: "Error al crear un proyecto", error });
  }
};

// Obtener todos los proyectos
const getAllProyects = async (req, res) => {
  try {
    const { especializacion, alcance, tiempo_duracion, fecha } = req.query;

    const filters = {};

    if (especializacion) {
      filters.especializacion = { $in: especializacion.split(",") };
    }
    if (alcance) {
      filters.alcance = alcance;
    }
    if (tiempo_duracion) {
      filters.tiempo_duracion = tiempo_duracion;
    }

    // Ordenar por fecha
    let sortOptions = {};
    if (fecha) {
      sortOptions.fecha = fecha === "asc" ? 1 : -1;
    }
    // Busco proyectos con los filtros aplicados
    const proyects = await Proyect.find(filters).sort(sortOptions);

    if (proyects.length === 0) {
      return res.status(200).json({
        message: "No se encontraron proyectos con los filtros aplicados",
        data: [],
      });
    }

    res.status(200).json(proyects);
  } catch (error) {
    res.status(400).json({ message: "Error al obtener proyectos", error });
  }
};

// Obtener un proyecto por ID
const getProyectById = async (req, res) => {
  const { id } = req.params;
  try {
    const proyect = await Proyect.findById(id);
    if (!proyect) {
      return res.status(404).json({ error: "Proyecto no encontrado" });
    }
    res.status(200).json(proyect);
  } catch (error) {
    res.status(400).json({ message: "No existe ningun proyecto con ese Id" });
  }
};

const getProyectByName = async (req, res) => {
  const { nombre } = req.query;
  console.log(nombre);
  try {
    // Si no encuntra el nombre que puse, va a devolver todos los proyectos
    if (!nombre) {
      const proyects = await proyectRepository.getAllProyects();
      return res.status(200).json(proyects);
    }

    const cleanedName = nombre.trim(); // Eliminar espacios en blanco q estan de mas

    const proyects = await proyectRepository.getProyectByName(cleanedName);

    if (proyects.length === 0) {
      return res.status(404).json({
        message: `No se encontraron proyectos que coincidan con: "${cleanedName}".`,
      });
    }

    res.status(200).json(proyects);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error al buscar proyectos: ${error.message}` });
  }
};

// Actualizar un proyecto
const updateProyect = async (req, res) => {
  const { id } = req.params;
  const proyectData = req.body;
  try {
    //Busco el proyecto para ver si existe por el ID
    const updatedProyect = await Proyect.findByIdAndUpdate(id, proyectData, {
      new: true,
    });
    // Si no lo encuntra por el ID
    if (!updatedProyect) {
      return res.status(404).json({
        message: ` Revisa el ID`,
      });
    }

    res.status(200).json(updatedProyect); // si lo encuntra lo actualiza
  } catch (error) {
    res.status(400).json({ message: "No se pudo actualizar el proyecto" });
  }
};

// Eliminar un proyecto
const deleteProyect = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProyect = await Proyect.findByIdAndDelete(id);
    if (!deletedProyect) {
      return res.status(404).json({ error: "Proyecto no encontrado" });
    }
    res.status(200).json({ message: "Proyecto eliminado" });
  } catch (error) {
    res.status(400).json({
      message: "No se encontro ningun proyecto para eliminar con ese ID",
    });
  }
};

const getProyectsByUserId = async (req, res) => {
  const userId = req.params.userId; // Esto extrae el ID correctamente

  try {
    const proyects = await Proyect.find({ usuario: userId }); // Cambia 'userId' por 'usuario'

    if (!proyects.length) {
      return res
        .status(404)
        .json({ message: "No se encontraron proyectos para este usuario" });
    }
    res.status(200).json(proyects);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener proyectos del usuario", error });
  }
};

export default {
  getAllProyects,
  getProyectById,
  getProyectByName,
  createProyect,
  updateProyect,
  deleteProyect,
  getProyectsByUserId,
};
