import { MongoClient, ServerApiVersion } from "mongodb";

const uri =
  "mongodb+srv://gustavomph:test1234@cluster0.b7hi4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
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
