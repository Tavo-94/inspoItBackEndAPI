import mongoose from "mongoose";

const proyectSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minLength: 3,
  },
  description: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  requisitos: {
    type: String,
    required: true,
  },
  especializacion: {
    type: [String], // varias especializaciones (Back - Front- Marketing - IT - Diseño)
    required: true,
  },
  alcance: {
    type: String,
    required: true,
  },
  tiempoDeDuracion: {
    type: String,
    required: true,
  },
  imagenes: {
    type: [String], // Array de URLs de imágenes
    required: false,
  },
  estado: {
    type: Boolean,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

const Proyect = mongoose.model("Proyect", proyectSchema);
export default Proyect;
