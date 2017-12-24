/**
 * Created by lwch on 2017/11/16.
 */
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const express = require('express');
const compression = require('compression');

const server = express();
server.engine('.html', ejs.__express);
server.set('view engine', 'html');
server.set('views', path.resolve(__dirname, '../../dist'));

if(process.env.NODE_ENV !== 'production'){
	//产品版本由Nginx做压缩
	server.use(compression());
}

server.use(express.static(path.resolve(__dirname, '../../dist')));

export default server;
