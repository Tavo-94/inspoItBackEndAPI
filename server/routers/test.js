import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {

    console.log("GET /test");
    let collection = await db.collection("listingsAndReviews");

    let results = await collection.find({}).limit(10).toArray();

    res.send(results).status(200);

})

export default router;