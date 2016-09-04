global.rootRequire = function(path){
    return require(__dirname + '/' + path);
};

var http = require('http');
var express = require('express');
var routes = require('./routes');


var app = strapApp(express());
app.use('/', express.static('../client/build'));
app.use('/api', routes);

var server = http.createServer(app);
server.listen(8081, function(){
	console.log('serving on 8081')
});


function strapApp(app){
    var bodyParser = require('body-parser');
    var cookieParser = require('cookie-parser');
    var cors = require('cors');

    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(cors());
    return app;
}




