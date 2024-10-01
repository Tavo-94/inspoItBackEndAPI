import express from "express";
import 'dotenv/config';
import cors from "cors";
import testRoute from "./routers/test.js";


//constantes de servidor
const app = express();
const port = process.env.PORT; 

//TODO extraer el path del origen a las variables de entorno
// const corsOptions = {
//     origin: "http://localhost:5000",
//     optionSuccessStatus: 200,
// };

//middlewares
app.use(cors());
app.use(express.json());
app.use("/test", testRoute);



//rutas
app.get("/", (req, res) => {
  res.send("Get Request!!!");
});

app.post("/", (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/user", (req, res) => {
  res.send("Put Request!!!");
});

app.delete("/user", (req, res) => {
  res.send("Delete Request!!!");
});

//iniciar servidor
app.listen(port, (err) => {
    if (err) {
        throw new Error(`No se pudo levantar el servidor -> ${err}`);
    }
    console.log(`Example app listening at http://localhost:${port}`);
  });
