//引入mysql
const mysql = require("mysql");

// MySQL数据库连接配置
let mysql_config = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "myvuex",
};

//解决问题：MySQL有一个wait_time当超过这个时间的时候连接会丢失
function handleDisconnection() {
  //创建连接
  let connection = mysql.createConnection(mysql_config);
  //连接数据库
  connection.connect(function (err) {
    //连接是否报错
    if (err) {
      setTimeout("handleDisconnection()", 2000);
    }
    console.log("数据库连接成功555");
  });
  //监听MySQL连接丢失时抛出的异常，code就是‘PROTOCOL_CONNECTION_LOST’
  connection.on("error", function (err) {
    // logger.error("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      // logger.error("db error执行重连:" + err.message);
      //执行重连
      handleDisconnection();
    } else {
      throw err;
    }
  });
  // 暴露出去
  module.exports = connection;
}

// 暴露出去
module.exports = handleDisconnection;
