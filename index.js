// const express = require("express");
import express from "express";
import { createServer } from 'http'
import cors from 'cors'

import router from "./routes/index.js";
import Mongo from "./config/db/index.js";
import { PORT } from "./config/index.js"
import { catchError } from './app/middlewares/error.js'
import runServerChat from "./serverChat.js";

const app = express();

const server = createServer(app);

app.use(cors());

// app.use(express.text());
app.use(express.json());

Mongo.connect()

router(app);
app.use(catchError)
runServerChat(server)
// const server = app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// runServerChat(server)