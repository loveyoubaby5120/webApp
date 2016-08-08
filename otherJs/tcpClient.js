var net = require('net');

const HOST = '127.0.0.1';
const PORT = 18001;

var tcpClient = net.Socket();

tcpClient.connect(PORT,HOST,function(){
    console.log('connect success\n');
    tcpClient.write('this is tcp client by Node.js\n');
});

tcpClient.on('data',function(data){
    console.log(data.toString()+'\n');
});