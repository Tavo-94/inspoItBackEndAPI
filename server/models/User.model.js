import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    trim: true,
    required: true,
    minLenght: 3,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tipo_usuario: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: false,
  },
  telefono: {
    type: String,
    required: false,
  },
  sede: {
    type: String,
    required: false,
  },
  imagen_perfil_url: {
    type: String,
    required: false,
  },
  imagen_portada_url: {
    type: String,
    required: false,
  },
  especialidad: {
    type: String,
    required: false,
  },
  proyectos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Proyecto",
    },
  ],
});

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;
