const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();
const mysql = require('../database');

const async = require('async');
var jwt = require('jsonwebtoken');

router.post("/signup", (req,res,next)=> {
  const user = {};
  user.email = req.body.email;
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      user.password = hash;
      let sql = 'insert into userschema(email, password) values (?,?)';
      let data = [user.email, user.password];

      mysql.database(sql,data,(err,result)=>{
        if(err){
          console.log(err);
          res.status(500).json({
            error:err
          });
          return;
        }
        res.status(201).json({
          message:'User created!',
          result: result
        });
      });
    });
});

router.post("/login",(req,res,next) => {
  let sql = 'select * from userschema where email=?';
  async.waterfall([
    callback => {
      mysql.database(sql,[req.body.email],(err,user)=>{
        if(err){
          if(conn){
            conn.release();
          }
          return callback(err);
        }
        if(!user){ // 존재하는 유저가 없는경우
          callback('Auth failed!');
        }
        bcrypt.compare(req.body.password, user[0].password).then((res) => { // 패스워드 비교
          if(!res){
            callback('Auth failed!');
          }
          else{
            callback(null,user);
          }
        })
      });
    },
    (user,callback) => {
      const token = jwt.sign({email: user[0].email}, 'secret_this_should_be_longer',{expiresIn: '1h'});
      callback(null,token);
    }
  ],(err,token)=>{
    if(err){
      console.log(err);
      res.status(401).json({
        message: err
      });
    }
    else{
      res.status(200).json({
        token: token
      });
    }
  });
});

module.exports= router;
