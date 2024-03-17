// const express = require("express");
import express from "express";
import cors from 'cors'

import router from "./routes/index.js";
import Mongo from "./config/db/index.js";
import {PORT} from "./config/index.js"
import {catchError} from './app/middlewares/error.js'
import runServerChat from "./serverChat.js";

const app = express();
// const corsOption = {
//   origin: "*",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   preflightContinue: false,
//   optionsSuccessStatus: 204
// }

// app.use(cors(corsOption))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://iu-material.onrender.com/"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// app.use(express.text());
app.use(express.json());

Mongo.connect()

router(app);
app.use(catchError)

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

runServerChat(server)