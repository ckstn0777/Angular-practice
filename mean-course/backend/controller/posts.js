const mysql = require('../database');

exports.createPost = (req,res,next)=>{
  const post = req.body;
  const url = req.protocol + '://' + req.get("host");
  let sql = 'insert into postschema(title,content,imagePath,creator) values (?,?,?,?)';
  let data = [post.title, post.content, url+"/images/"+req.file.filename, req.userData.email];

  mysql.database(sql,data,(err,result)=>{
    if(err){
      res.status(500).json({
        message:"Creating a post failed!",
        imagePath: imagePath
      });
      return;
    }

    res.status(200).json({
      message:'Posts fetched successfully!',
      post:[post.title, post.content, url+"/images/"+req.file.filename]
    });
  });
}

exports.updatePost = (req,res,next)=>{
  let imagePath = req.body.imagePath; //string으로 전달받을때
  if(req.file){ //파일로 전달받을때
    const url = req.protocol + '://' + req.get("host");
    imagePath = url+"/images/"+req.file.filename;
  }
  // 게시글 수정시 자신의 아이디로 작성한 게시글만 수정되도록 작성
  let sql = 'update postschema set title=?, content=?, imagePath=? where id=? and creator=?';
  let data = [req.body.title, req.body.content, imagePath, req.params.id, req.userData.email];
  mysql.database(sql,data,(err,result)=>{
    if(err){
      res.status(500).json({
        message:"Couldn't update post!",
        imagePath: imagePath
      });
      return;
    }

    if(result.affectedRows>0){
      res.status(200).json({
        message:"Update successful!",
        imagePath: imagePath
      });
    }else{
      res.status(401).json({
        message:"Not authorized!",
        imagePath: imagePath
      });
    }
  });
}

exports.getPosts = (req,res,next)=>{
  const pageSize = +req.query.pagesize;  // +는 문자를 숫자 처리
  const currentPage = +req.query.page;
  console.log(req.query);
  let sql = 'select * from postschema limit ?,?'; // 시작 행, 개수를 의미함
  mysql.database(sql,[pageSize*(currentPage-1), pageSize],(err,result)=>{
    if(err){
      res.status(500).json({
        message:"Fetching posts failed!",
        imagePath: imagePath
      });
      return;
    }

    res.status(200).json({
      message:'Posts fetched successfully!',
      posts:result
    });
  });
}

exports.getPost = (req,res,next)=>{
  let sql = 'select * from postschema where id=?'
  mysql.database(sql,req.params.id,(err,result)=>{
    if(err){
      res.status(500).json({
        message:"Fetching post failed!",
        imagePath: imagePath
      });
      return;
    }

    if(result){
      console.dir(result);
      res.status(200).json(result);
    }
    else{
      res.status(404).json({message:'Post not found!'});
    }
  });
}

exports.deletePost = (req,res,next)=>{
  let sql = 'delete from postschema where id=? and creator=?';
  let data = [req.params.id, req.userData.email];
  mysql.database(sql,data,(err,result)=>{
    if(err){
      res.status(500).json({
        message:"Deleting posts failed!",
        imagePath: imagePath
      });
      return;
    }
    if(result.affectedRows>0){
      res.status(200).json({
        message:"Post deleted!"
      });
    }else{
      res.status(401).json({
        message:"Not authorized!",
      });
    }
  });
}
