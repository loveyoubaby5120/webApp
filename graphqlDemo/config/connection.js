const mysqldb = require('./mysql.js');
const connection = mysqldb();

const execQuery = (sql, data, callback) => {
  const querys = connection.query(sql, data, (err, rows) => {
    release(connection);
    if (err) {
      errinfo = 'DB-SQL语句执行错误:' + err;
      callback(err);
    } else {
      callback(null, rows);
    }
  });

  console.log(querys.sql);
}

const release = (connection) => {
  try {
    connection.release((error) => {
      if (error) {
        console.log('DB-关闭数据库连接异常！');
      }
    });
  } catch (err) { }
}

module.exports = (sql, data) => {
  data = data ? data : []
  //对外接口返回Promise函数形式
  return new Promise((resolve, reject) => {
    execQuery(sql, data, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    })
  });
}
