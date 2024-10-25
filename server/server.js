import express from "express";
import 'dotenv/config';
import cors from "cors";
import {connectToDb} from './db/connection.js';
import userRouter from './routers/usuarios/user.routes.js';
import morgan from "morgan";
import loginRoutes from "./routers/login.routes.js";
import jsonwebtoken from "jsonwebtoken";
import tokenVerify from "./routers/tokenValidator.js";

//constantes de servidor
const app = express();
const port = process.env.PORT; 
const key = process.env.JWT_SECRET

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//logica JWT
const jwt = jsonwebtoken
app.set('key', key)
app.use(express.urlencoded({extended: true}))

app.post('/auth', (req, res)=>{
    const {user, password} = req.body

    if(user === "hlrivero" && password === "1234"){
        const payload = {userID: "1234"}
        const token = jwt.sign(payload, key, {
            expiresIn: 1440
        })
        res.json({
            mensaje: "auth correcto",
            token: token
        })
    }else{
        res.json({mensaje: "usuario incorrecto"})
    }

   
})


//rutas
 app.use("/user", userRouter);
 app.use("/login", loginRoutes)
 app.use("/token", tokenVerify)

//iniciar servidor

//conexion a la base de datos
await connectToDb();

app.listen(port, (err) => {
    if (err) {
        throw new Error(`No se pudo levantar el servidor -> ${err}`);
    }
    console.log(`Example app listening at http://localhost:${port}`);
  });
