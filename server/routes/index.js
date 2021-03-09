var express = require("express");
var router = express.Router();

// 引入连接数据库模块
const connection = require("./conn");

// 连接数据库
connection.connect(() => {
  console.log("数据库连接成功!");
});

// 接收登录请求
router.post("/api/checklogin", (req, res) => {
  // 接收用户名和密码
  let { userName, passWord } = req.body;
  console.log(userName, passWord);
  //去数据库查询是否存在这个账号和密码的用户
  // 执行sql查询
  const sqlStr = `select * from users where userName = '${userName}' and passWord = '${passWord}'`;
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err;
    } else {
      res.send(data);
    }
  });
  // res.send("1222");
});

// 接收获取用户列表的请求
router.get("/api/getuserlist", (req, res) => {
  //  查询数据库 把当前所有用户数据 返回给前端
  const sqlStr = "select * from users";
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err;
    } else {
      res.send(data);
    }
  });
});

module.exports = router;

/*  
// 建表
  create table users (
    id int primary key auto_increment,
    userName varchar(50),
    passWord varchar(50),
    realName varchar(50),
    age int,
    idType varchar(50)
  );
  
// 插入数据
  insert into users(userName, passWord, realName, age, idType) values('admin', '12345', '柯南', 10,'223552200011252545');
  insert into users(userName, passWord, realName, age, idType) values('guest', '12345', '小兰', 15,'223552200011252546');
  insert into users(userName, passWord, realName, age, idType) values('bumei', '12345', '步美', 8,'223552200011252547');
  insert into users(userName, passWord, realName, age, idType) values('yuantai', '12345', '圆太', 9,'223552200011252548');
  insert into users(userName, passWord, realName, age, idType) values('guangyan', '12345', '光彦', 11,'223552200011252549');
  insert into users(userName, passWord, realName, age, idType) values('xiaoai', '12345', '小哀', 12,'223552200011252550');

  insert into users(userName, passWord, realName, age, idType) values('xiaowulang', '12345', '小五郎', 12,'223552200011252551');
  insert into users(userName, passWord, realName, age, idType) values('gaomu', '12345', '高木', 12,'223552200011252552');
  insert into users(userName, passWord, realName, age, idType) values('meihezi', '12345', '美和子', 12,'223552200011252553');
  insert into users(userName, passWord, realName, age, idType) values('youmei', '12345', '由美', 12,'223552200011252554');
  insert into users(userName, passWord, realName, age, idType) values('xiongji', '12345', '熊吉', 12,'223552200011252555');

  insert into users(userName, passWord, realName, age, idType) values('ali', '12345', '阿笠博士', 12,'223552200011252555');
  insert into users(userName, passWord, realName, age, idType) values('youzuo', '12345', '优作', 12,'223552200011252555');
  insert into users(userName, passWord, realName, age, idType) values('youxizi', '12345', '有希子', 12,'223552200011252555');
  insert into users(userName, passWord, realName, age, idType) values('yingli', '12345', '英里', 12,'223552200011252555');
  insert into users(userName, passWord, realName, age, idType) values('zhuli', '12345', '朱莉', 12,'223552200011252555');
  
*/
