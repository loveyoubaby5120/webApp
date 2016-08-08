var net = require('net');

const HOST = '127.0.0.1';
const POST = 18001;

var clientHandler = function(socket){
    console.log('someone connected');

    socket.on('data',function dataHandler(data){
        console.log(socket.remoteAddress,socket.remotePort,'shend',data.toString());
        socket.write('收到消息\n');
    });

    socket.on('close',function(){
        console.log(socket.remoteAddress,socket.remotePort,'disconnected');
    });

};

var app = net.createServer(clientHandler);

app.listen(POST,HOST);

console.log('服务器成功启动 tcp://',HOST,':',POST);