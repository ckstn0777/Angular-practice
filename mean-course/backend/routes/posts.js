const express = require("express");

const router = express.Router();
const mysql = require('../database');

router.post('', (req,res,next)=>{
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

router.put("/:id", (req,res)=>{
  let sql = 'update postschema set title=?, content=? where id=?';
  let data = [req.body.title, req.body.content, req.params.id];
  console.log(data);
  mysql.database(sql,data,(result)=>{
    res.status(200).json({
      message:"Update successful!"
    });
  });
});

router.get('', (req,res,next)=>{
  let sql = 'select * from postschema';
  mysql.database(sql,null,(result)=>{
    res.status(200).json({
      message:'Posts fetched successfully!',
      posts:result
    });
  });
});

router.get("/:id",(req,res,next)=>{
  let sql = 'select * from postschema where id=?'
  mysql.database(sql,req.params.id,(result)=>{
    if(result){
      console.dir(result);
      res.status(200).json(result);
    }
    else{
      res.status(404).json({message:'Post not found!'});
    }
  });
});

router.delete("/:id",(req,res,next)=>{
  console.log('id',req.params.id);
  let sql = 'delete from postschema where id=?';
  let data = req.params.id;
  mysql.database(sql,data,(result)=>{
    res.status(200).json({
      message:"Post deleted!"
    });
  });
});

module.exports = router;
