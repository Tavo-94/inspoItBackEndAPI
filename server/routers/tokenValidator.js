import jsonwebtoken from "jsonwebtoken";
import express from "express";

const key = process.env.JWT_SECRET;
const jwt = jsonwebtoken;

const tokenVerify = express.Router();

const tokenVery = async (req, res) => {
    const token = req.params.token;
    
    try {
        const decoded = await jwt.verify(token, key);
        res.status(200).json({ id: decoded.id });
    } catch (err) {
        console.error("Token inválido o expirado", err);
        res.status(401).json({ success: false, message: "Token inválido o expirado" });
    }
};

// Cambié el método del router para que use un path y la función de verificación.
tokenVerify.get("/:token", tokenVery); 

export default tokenVerify;
