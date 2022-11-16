import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
const app = express();
import mongoose from "mongoose";
import cors from "cors";

app.use(bodyParser.urlencoded({ extended: false }));
dotenv.config();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.port || 5000;

app.listen(port, () => {
  console.log(`Server listen ${port}`);
});

app.get("/", (req, res) => {
  console.log("Başarılı");

  res.send({ message: "success" });
});
