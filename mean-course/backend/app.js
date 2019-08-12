const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use("/images", express.static(path.join(__dirname, "images"))); //접근허가
// app.use("/", express.static(path.join(__dirname,"angular"))); //접근허가

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.use("/api/posts", postsRouter);
app.use("/api/user", userRouter);
/*
app.use((req,res,next)=>{
  res.sendFile(path.join(__dirname, "angular", "index.html"));
});
*/

module.exports = app;
