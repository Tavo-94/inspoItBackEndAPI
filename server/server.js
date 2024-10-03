import express from "express";
import 'dotenv/config';
import cors from "cors";
import {connectToDb} from './db/connection.js';
import userRouter from './routers/usuarios/user.routes.js';
import morgan from "morgan";

//constantes de servidor
const app = express();
const port = process.env.PORT; 

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());



//rutas
 app.use("/user", userRouter);


//iniciar servidor

//conexion a la base de datos
await connectToDb();

app.listen(port, (err) => {
    if (err) {
        throw new Error(`No se pudo levantar el servidor -> ${err}`);
    }
    console.log(`Example app listening at http://localhost:${port}`);
  });
