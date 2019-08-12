const mysql = require('mysql');
const async = require('async');

const pool = mysql.createPool({
  host:'localhost',
  port:'3306',
  user:'root',
  password: process.env.MYSQL_PW,
  database:'post',
  connectionLimit:10,
});

//콜백 -> async모듈 방식의 순차실행적용
const database = (sql,data,cb) => {
  async.waterfall([
    callback=>{
      pool.getConnection((err,conn)=>{
        if(err){
          if(conn){
            conn.release();
          }
          return callback(err);
        }
        callback(null,conn);
      });
    },
    (conn,callback)=>{
      conn.query(sql,data,(err,result)=>{
        conn.release();
        if(err) return callback(err);

        callback(null,result);
      });
    },
    (result,callback)=>{
      callback(null,result);
    }
  ],(err,result)=>{
    //console.log('error: ',err);
    return cb(err,result);
  });
}



module.exports.database = database;
