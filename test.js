var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',//远程MySQL数据库的ip地址
  user     : 'root',
  password : '123456',
  port: 3306
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows[0].solution);
});

connection.end();