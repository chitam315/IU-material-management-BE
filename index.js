// const express = require("express");
import express from "express";
import cors from 'cors'

import router from "./routes/index.js";
import Mongo from "./config/db/index.js";
import {PORT} from "./config/index.js"
import {catchError} from './app/middlewares/error.js'
import runServerChat from "./serverChat.js";

const app = express();
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  credentials: true
  
}

app.use(cors(corsOptions));

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader("HTTP/1.1 200 OK")
  next();
})
// app.use(express.text());
app.use(express.json());

Mongo.connect()

router(app);
app.use(catchError)

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

runServerChat(server)