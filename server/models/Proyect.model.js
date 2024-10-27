import mongoose, { pluralize } from "mongoose";
import User from "./User.model.js";

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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

proyectSchema.pre("findOneAndDelete", async function (next) {
  const proyect = await this.model.findOne(this.getQuery());
  if (!proyect) {
    return next();    
  }

  await User.findByIdAndUpdate(proyect.user, {
    $pull: {
      proyectos: proyect._id,
    }
  })

  next();
} )

proyectSchema.post("save", async function (doc, next) {
    try {
      await User.findByIdAndUpdate(doc.user, {
        $push: {
          proyectos: doc._id,
        },
      })
      console.log("Proyecto agregado al usuario");
      next();

    } catch (error) {
      console.error("Error al agregar el proyecto al usuario:", error);
      next(error);
    }
})

const Proyect = mongoose.model("Proyect", proyectSchema);
export default Proyect;
