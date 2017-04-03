const mysql = require('mysql');
const config = require('./config.js');

module.exports = (option) => {

  let db_config = config.mysql;

  let connection;

  const handleDisconnect = () => {

    connection = mysql.createConnection(db_config);

    connection.connect(function (err) {
      if (err) {
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000);
      }
    });

    connection.on('error', function (err) {
      console.log('db error', err);
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        handleDisconnect();
      } else {
        throw err;
      }
    });
  }

  // handleDisconnect(); 

  let pool;

  const poolHandleDisconnect = () => {
    pool = mysql.createPool(db_config);
  }

  console.log('mysql connection');


  if (option == 'pool') {
    poolHandleDisconnect();
    return pool;
  }
  else {
    handleDisconnect();
    return connection;
  }

}

