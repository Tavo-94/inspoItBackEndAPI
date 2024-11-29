import express from "express";
import { applyForProject } from "../../controller/emailController.js";

const emailRouter = express.Router();

// Ruta para que los desarrolladores se postulen a un proyecto
emailRouter.post("/apply/:id", applyForProject);

export default emailRouter;
