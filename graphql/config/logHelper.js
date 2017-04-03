let helper = {};
exports.helper = helper;

const log4js = require('log4js');
const fs = require("fs");
const config = require('./config.js');
const path = require("path");

// 加载配置文件  
let objConfig = config.log;


// 检查配置文件所需的目录是否存在，不存在时创建  
if (objConfig.appenders) {
  let baseDir = objConfig["customBaseDir"];
  let defaultAtt = objConfig["customDefaultAtt"];

  for (let i = 0, j = objConfig.appenders.length; i < j; i++) {
    let item = objConfig.appenders[i];
    if (item["type"] == "console")
      continue;

    if (defaultAtt != null) {
      for (let att in defaultAtt) {
        if (item[att] == null)
          item[att] = defaultAtt[att];
      }
    }
    if (baseDir != null) {
      if (item["filename"] == null)
        item["filename"] = baseDir;
      else
        item["filename"] = baseDir + item["filename"];
    }
    let fileName = item["filename"];
    if (fileName == null)
      continue;
    let pattern = item["pattern"];
    if (pattern != null) {
      fileName += pattern;
    }
    let category = item["category"];
    if (!isAbsoluteDir(fileName))//path.isAbsolute(fileName))  
      throw new Error("配置节" + category + "的路径不是绝对路径:" + fileName);
    let dir = path.dirname(fileName);
    checkAndCreateDir(dir);
  }
}

// 目录创建完毕，才加载配置，不然会出异常  
log4js.configure(objConfig);

let logger = log4js.getLogger('cheese');

let logDebug = log4js.getLogger('logDebug');
let logInfo = log4js.getLogger('logInfo');
let logWarn = log4js.getLogger('logWarn');
let logErr = log4js.getLogger('logErr');

let logLevel = log4js.getLogger('setLevel');
let logTrace = log4js.getLogger('trace');
let logFatal = log4js.getLogger('fatal');

helper.writeDebug = (msg) => {
  if (msg == null)
    msg = "";
  logDebug.debug(msg);
};

helper.writeInfo = (msg) => {
  if (msg == null)
    msg = "";
  logInfo.info(msg);
};

helper.writeWarn = (msg) => {
  if (msg == null)
    msg = "";
  logWarn.warn(msg);
};

helper.writeErr = (msg, exp) => {
  if (msg == null)
    msg = "";
  if (exp != null)
    msg += "\r\n" + exp;
  logErr.error(msg);
};

// 配合express用的方法  
exports.use = (app) => {
  //页面请求日志, level用auto时,默认级别是WARN  
  // app.use(log4js.connectLogger(logInfo, {level:'debug', format:':method :url'}));  
}

// 判断日志目录是否存在，不存在时创建日志目录  
const checkAndCreateDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

// 指定的字符串是否绝对路径  
const isAbsoluteDir = (path) => {
  if (path == null)
    return false;
  let len = path.length;

  let isWindows = process.platform === 'win32';
  if (isWindows) {
    if (len <= 1)
      return false;
    return path[1] == ":";
  } else {
    if (len <= 0)
      return false;
    return path[0] == "/";
  }
}  
