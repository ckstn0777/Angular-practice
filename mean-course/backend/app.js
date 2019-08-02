const express = require('express');
const bodyParser = require('body-parser');
//const mysql = require('mysql');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const mysql = require('./database');

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/api/posts', (req,res,next)=>{
  const post = req.body;
  let sql = 'insert into postschema(title,content) values (?,?)';
  let data = [post.title, post.content];

  mysql.database(sql,data,(result)=>{
    console.log(result);
    res.status(201).json({
      message:'Post added sucessfully'
    });
  });
});

app.get('/api/posts', (req,res,next)=>{
  let sql = 'select * from postschema';
  mysql.database(sql,null,(result)=>{
    res.status(200).json({
      message:'Posts fetched successfully!',
      posts:result
    });
  });
});

app.delete("/api/posts/:id",(req,res,next)=>{
  console.log('id',req.params.id);
  let sql = 'delete from postschema where id=?';
  let data = req.params.id;
  mysql.database(sql,data,(result)=>{
    res.status(200).json({
      message:"Post deleted!"
    });
  });
});

module.exports = app;
