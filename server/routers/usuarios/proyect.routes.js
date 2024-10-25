import express from "express";
import proyectController from "../../controller/proyectController.js";

const proyectRouter = express.Router();

proyectRouter.post("/", proyectController.createProyect); // Crear proyecto
proyectRouter.get("/", proyectController.getAllProyects); // Obtener todos los proyectos
proyectRouter.get("/search", proyectController.getProyectByName); // Ejemplo http://localhost:3000/proyect/search?name=E

proyectRouter.get("/:id", proyectController.getProyectById); // Obtener proyecto por ID
proyectRouter.put("/:id", proyectController.updateProyect); // Actualizar proyecto
proyectRouter.delete("/:id", proyectController.deleteProyect); // Eliminar proyecto

export default proyectRouter;
