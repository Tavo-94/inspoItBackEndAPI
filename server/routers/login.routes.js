import express from "express";
import loginController from "../controller/loginController.js";


const loginRoutes = express.Router()

loginRoutes.post('/', loginController.login)

export default loginRoutes