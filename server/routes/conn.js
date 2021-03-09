//引入mysql
const mysql = require("mysql");

// 创建连接
let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "myvuex",
});
// connection.connect();

// 暴露出去
module.exports = connection;
