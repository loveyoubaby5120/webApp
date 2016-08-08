var express = require('express');
var morgan = require('morgan');


var app = express();

app.use(express.static('./public'));

app.use(morgan());

app.get('/',function(req,res){
    res.end('hello\n');
});



var Router = express.Router();
/*
* http://localhost:18001/add
* http://localhost:18001/list
*
* */


Router.get('/add',function(req,res){
    res.end('Router/add\n');
});

Router.get('/list',function(req,res){
    res.end('Router/list\n');
});

app.use('/post',Router);




app.route('/article')
    .get(function(req,res){
        res.end("route /article get\n");
    }).post(function(req,res){
        res.end('route /article get\n');
    });


//http://localhost:18001/news/123

app.param('newsId',function(req,res,next,newId){
    req.newsId = newId;
    next();
});

app.get('/news/:newsId',function(req,res){
    res.end('newsid:'+req.newsId+'\n');
});


app.listen(18001,function afterListen(){
    console.log('服务启动成功!');
});