import { MongoClient, ServerApiVersion } from "mongodb";
import 'dotenv/config';

const MONGO_URI_REMOTO = process.env.MONGO_URI_REMOTO;

const client = new MongoClient(MONGO_URI_REMOTO, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  await client.connect();

  await client.db("gustavomph").command({ ping: 1 });

  console.log("Connected successfully to MongoDB!");
} catch (error) {
  console.error(error);
}

let db = client.db("sample_airbnb");


export default db;
