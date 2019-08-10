const express = require("express");
const multer = require("multer");
const checkAuth = require('../middleware/check-auth');
const router = express.Router();
const mysql = require('../database');

const MIME_TYPE_MAP = {
  'image/png' : 'png',
  'image/jpeg' : 'jpg',
  'image/jpg' : 'jpg'
};

const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if(isValid){
      error = null;
    }
    cb(error,"backend/images");
  },
  filename: (req,file,cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null,name+'-'+Date.now()+'.'+ext);
  }
});

router.post('', checkAuth, multer({storage:storage}).single("image"), (req,res,next)=>{
  const post = req.body;
  const url = req.protocol + '://' + req.get("host");
  let sql = 'insert into postschema(title,content,imagePath) values (?,?,?)';
  let data = [post.title, post.content, url+"/images/"+req.file.filename];

  mysql.database(sql,data,(err,result)=>{
    if(err){console.log(err); return;}
    console.log([post.title, post.content, url+"/images/"+req.file.filename]);

    res.status(200).json({
      message:'Posts fetched successfully!',
      post:[post.title, post.content, url+"/images/"+req.file.filename]
    });
  });
});

router.put("/:id", checkAuth, multer({storage:storage}).single("image"), (req,res)=>{
  let imagePath = req.body.imagePath; //string으로 전달받을때
  if(req.file){ //파일로 전달받을때
    const url = req.protocol + '://' + req.get("host");
    imagePath = url+"/images/"+req.file.filename;
  }
  let sql = 'update postschema set title=?, content=?, imagePath=? where id=?';
  let data = [req.body.title, req.body.content, imagePath, req.params.id];
  console.log(data);
  mysql.database(sql,data,(err,result)=>{
    if(err){console.log(err); return;}
    res.status(200).json({
      message:"Update successful!",
      imagePath: imagePath
    });
  });
});

router.get('', (req,res,next)=>{
  const pageSize = +req.query.pagesize;  // +는 문자를 숫자 처리
  const currentPage = +req.query.page;
  console.log(req.query);
  let sql = 'select * from postschema limit ?,?'; // 시작 행, 개수를 의미함
  mysql.database(sql,[pageSize*(currentPage-1), pageSize],(err,result)=>{
    if(err){console.log(err); return;}
    res.status(200).json({
      message:'Posts fetched successfully!',
      posts:result
    });
  });
});

router.get("/:id",(req,res,next)=>{
  let sql = 'select * from postschema where id=?'
  mysql.database(sql,req.params.id,(err,result)=>{
    if(err){console.log(err); return;}

    if(result){
      console.dir(result);
      res.status(200).json(result);
    }
    else{
      res.status(404).json({message:'Post not found!'});
    }
  });
});

router.delete("/:id", checkAuth, (req,res,next)=>{
  console.log('id',req.params.id);
  let sql = 'delete from postschema where id=?';
  let data = req.params.id;
  mysql.database(sql,data,(err,result)=>{
    if(err){console.log(err); return;}
    res.status(200).json({
      message:"Post deleted!"
    });
  });
});

module.exports = router;
