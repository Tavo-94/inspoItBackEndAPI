import { body, checkSchema, validationResult } from "express-validator";
import userController from "../../controller/userController.js";
import express from "express";

const userRouter = express.Router();

const validarNombre = () => {
    return body('nombre').isString().withMessage('El nombre debe ser un string')
    .matches(/^(?!\s)[A-Za-záéíóúÁÉÍÓÚñÑ -]+$/).withMessage('El nombre solo acepta letras, espacios, guiones y guiones bajos');
}
const validarEmail = () => {
  return body("email").isEmail().withMessage("El email no es valido");
};
const validarPassword = () => {
  return body("password")
    .isLength({ min: 6 })
    .withMessage("El password debe tener al menos 6 caracteres")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
    .withMessage(
      "El password debe tener al menos 1 mayuscula, 1 minuscula, 1 numero y 1 caracter especial"
    );
};

const validarTipoUsuario = () => {
  return body("tipo_usuario")
    .isIn(["ADMIN", "USUARIO"])
    .withMessage("El tipo de usuario debe ser 'admin' o 'usuario'");
};

const validarDescripcion = () => {
  return body("descripcion").if(body("descripcion").notEmpty())
    .isLength({ max: 300 }).withMessage("La descripción no debe superar los 300 caracteres")
    .matches(/^(?!\s)[A-Za-záéíóúÁÉÍÓÚñÑ.,;\s-]+$/g).withMessage('La descripción solo acepta letras, espacios, guiones y guiones bajos');
};

const validarTelefono = () => {
  return body("telefono").if(body("telefono").notEmpty())
  .isMobilePhone("es-AR").withMessage("El telefono no es valido");
};

const validarImagenPerfil = () => {
  return body("imagen_perfil_url").if(body("imagen_perfil_url").notEmpty())
  .isURL().withMessage("La imagen de perfil no es valida");
};

const validarImagenPortada = () => {
  return body("imagen_portada_url").if(body("imagen_portada_url").notEmpty())
  .isURL().withMessage("La imagen de portada no es valida");
};

const validarEspecialidad = () => {
    return body("especialidad").if(body("especialidad").notEmpty())
        .isIn(["Frontend", "Backend", "Fullstack", "Data Science", "Machine Learning", "Cybersecurity", "Cloud Computing", "Mobile Development", "UI/UX Design"]).withMessage("La especialidad no es valida");
}



userRouter.post(
  "/test-validation",
  validarNombre(),
  validarEmail(),
  validarPassword(),
  validarTipoUsuario(),
  validarDescripcion(),
  validarTelefono(),
  validarImagenPerfil(),
  validarImagenPortada(),
  validarEspecialidad(),
  (req, res) => {
    const errors = validationResult(req);
    res.json({ errors: errors.array() });
  }
);

userRouter.post("/", userController.createUser);

userRouter.get("/", userController.getAllUsers);

userRouter.get("/:id", userController.getUserById);

userRouter.put("/:id", userController.updateUser);

userRouter.delete("/:id", userController.deleteUser);

export default userRouter;
