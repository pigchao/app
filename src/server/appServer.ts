/**
 * Created by lwch on 2017/11/16.
 */
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const express = require('express');
const compression = require('compression');

const server = express();
if(process.env.NODE_ENV !== 'production'){
	//产品版本由Nginx做压缩
	server.use(compression());
}

server.get('/', function(req, res, next) {
	res.send('你访问了根目录');
});

server.get('/zzq', function(req, res, next) {
	res.send('你访问了曽子强目录');
});

server.get('/lwc', function(req, res, next) {
	res.send(fs.readFileSync(path.resolve(__dirname, '../../dist/client/app.html')));
});

server.use(express.static(path.resolve(__dirname, '../../dist/client')));

export default server;
