/**
 * Created by youpeng on 16/7/28.
 */
const path = require("path");

module.exports = {
  port: 3300,
  mysql: {
    host: 'rm-2zecpf4qs6zs7843u.mysql.rds.aliyuncs.com',
    port: 3306,
    user: 'mysql_date',
    password: 'Admin123456',
    database: 'shoppers',
    connectionLimit: 50
  },
  log: {
    "appenders": [
      // 下面一行应该是用于跟express配合输出web请求url日志的  
      { "type": "console", "category": "console" },
      // 定义一个日志记录器  
      {
        "type": "dateFile",         					// 日志文件类型，可以使用日期作为文件名的占位符  
        "filename": path.join(__dirname, "../logs/"),   // 日志文件名，可以设置相对路径或绝对路径  
        "pattern": "debug/yyyyMMdd.txt",  			// 占位符，紧跟在filename后面  
        "absolute": true,                   			// filename是否绝对路径  
        "alwaysIncludePattern": true,      				// 文件名是否始终包含占位符  
        "category": "logInfo"               			// 记录器名  
      }],
    "levels": { "logInfo": "DEBUG" },        			// 设置记录器的默认显示级别，低于这个级别的日志，不会输出  
    replaceConsole: false							// 让所有console输出到日志中，以[INFO] console代替console默认样式
  },
};
