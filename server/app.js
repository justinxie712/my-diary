import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", routes);

const DB = `mongodb+srv://justinxie712:MyDiaryCluster@my-diary-cluster.w86alae.mongodb.net/?retryWrites=true&w=majority&appName=my-diary-cluster`;

mongoose.connect(DB).then(() => {
  app.listen(3000, () =>
    console.log("Server running on http://localhost:3000")
  );
});
