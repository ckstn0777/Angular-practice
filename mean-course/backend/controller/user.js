const bcrypt = require("bcrypt");
const mysql = require('../database');

const async = require('async');
var jwt = require('jsonwebtoken');

exports.createUser = (req,res,next)=> {
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
            message: "Invalid authentication credentials!"
          });
          return;
        }
        res.status(201).json({
          message:'User created!',
          result: result
        });
      });
    });
}

exports.userLogin = (req,res,next) => {
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
        if(!user[0]){ // 존재하는 유저가 없는경우
          return callback('Auth failed!');
        }
        console.log('222');
        bcrypt.compare(req.body.password, user[0].password).then((res) => { // 패스워드 비교
          if(!res){
            return callback('Auth failed!');
          }
          else{
            callback(null,user);
          }
        })
      });
    },
    (user,callback) => {
      const token = jwt.sign({email: user[0].email}, process.env.JWT_KEY,{expiresIn: '1h'});
      callback(null,token,user);
    }
  ],(err,token,user)=>{
    if(err){
      console.log(err);
      res.status(401).json({
        message: "Invalid authentication credentials!"
      });
    }
    else{
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: user[0].email
      });
    }
  });
}
