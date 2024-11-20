import mongoose, { pluralize } from "mongoose";
import Usuario from "./User.model.js";

const proyectoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    trim: true,
    required: true,
    minLength: 3,
  },
  descripcion: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  requisitos: {
    type: String,
    required: true,
  },
  especializacion: [
    {
      type: String,
      enum: ["FrontEnd", "BackEnd", "Marketing Digital", "Diseño UX/UI"], // Opciones fijas
      required: true,
    },
  ],
  alcance: {
    type: String,
    enum: ["Pequeño", "Mediano", "Grande"], // Opciones fijas
    required: true,
  },
  tiempo_duracion: {
    type: String,
    enum: ["Urgente", "Corto", "Medio", "Largo"], // Opciones fijas
    required: true,
  },
  estado: {
    type: Boolean,
    default: true,
  },
  imagenes_urls: {
    type: [String], // Array de URLs de imágenes
    required: false,
  },
  estado: {
    type: Boolean,
    default: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

// middleware que se ejecuta antes de eliminar un proyecto
// este middleware se encarga de eliminar el proyecto de la lista de proyectos
// del usuario que lo creó
// !se ejecuta antes de realizar la operacion de eliminar
proyectoSchema.pre("findOneAndDelete", async function (next) {
  const proyect = await this.model.findOne(this.getQuery());
  if (!proyect) {
    return next();
  }

  await Usuario.findByIdAndUpdate(proyect.usuario, {
    $pull: {
      proyectos: proyect._id,
    },
  });

  next();
});

proyectoSchema.post("save", async function (doc, next) {
  try {
    // Actualiza el usuario para agregar el proyecto recién creado a su lista de proyectos
    console.log(doc._id, "Post save,  oid del proyecto");
    console.log(doc.usuario, "Post save, oid del usuario");
    await Usuario.findByIdAndUpdate(doc.usuario, {
      $push: {
        proyectos: doc._id,
      },
    });
    console.log("Proyecto agregado al usuario");
    next();
  } catch (error) {
    // Maneja cualquier error que ocurra durante la actualización del usuario
    console.error("Error al agregar el proyecto al usuario:", error);
    next(error);
  }
});

const Proyecto = mongoose.model("Proyecto", proyectoSchema);
export default Proyecto;
