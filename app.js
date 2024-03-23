const express = require("express");
const router =require('./src/route/api.js');
const app = express();
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const hpp=require('hpp');
const cors=require('cors');
const mongoose = require("mongoose");


//Cors Setup
app.use(cors());
//Security Implementation
app.use(helmet());
app.use(hpp());
app.use(express.json({ limit: "1000kb" }));
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }) // 15 minutes
app.use(limiter );

// Database Connection
const URI = "mongodb+srv://hamidbd2310:Hamid121@cluster0.asvkdue.mongodb.net/to-do2";
const OPTION = { user: '', pass: '' ,autoIndex: true };
mongoose.connect(URI, OPTION)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.error("MongoDB Connection Error:", error);
  });
//Router Setup
 app.use('/api',router);

//404 Not Found
  app.use("*",(req, res) =>
  res.status(404).json({
    success: false,message: "Page not found",}))

module.exports = app;