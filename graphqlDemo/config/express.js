/**
 * Created by youpeng on 16/7/28.
 */
// const colors = require("colors")
import colors from 'colors';
import express from 'express';
import bodyParser from 'body-parser';
import querystring from 'querystring';
// import schema from '../app/schema';
import log from './logHelper';
const logger = log.helper;

module.exports = () => {

  console.log('init express...');
  const app = express();

  app.use(bodyParser.json());


  app.use((req, res, next) => {

    let nowDate = new Date().getTime();

    console.log("\t-->   ".dim.gray + req.method.bold + "  " + req.originalUrl.dim);

    next();

    if (res.statusCode == 200) {
      console.log("\t<--   ".dim.gray + req.method.bold + "  " + req.originalUrl.dim + "  " + (res.statusCode + "").green + "  " + ((new Date().getTime() - nowDate) + "ms").yellow);
    }
    else {
      console.log("\t<--   ".dim.gray + req.method.bold + "  " + req.originalUrl.dim + "  " + (res.statusCode + "").red + "  " + ((new Date().getTime() - nowDate) + "ms").yellow);
    }
  });

  app.use(express.static('./public'));

  log.use(app);

  app.use('/graphql', require('../app/api/graphql'));

  // app.post('/graphql', (req, res) => {
  //   res.send('Hello!');
  // });

  app.use((err, req, res, next) => {
    res.status(404);
    try {
      return res.json('Not Found');
    } catch (e) {
      console.error('404 set header after sent');
    }
  });

  app.use((err, req, res, next) => {
    if (!err) {
      return next();
    } else {
      res.status(500);
      try {
        return res.json(err.messgae || 'server error');
      } catch (e) {
        console.error('500 set header after sent');
      }
    }
  });

  return app;
};
