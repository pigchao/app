#!/bin/env node
//  Webull sample Node application
import wechatRouter from './route/api/wechat';
const config = require('../../config');
/**
 *  Define the Server application.
 */
const ServerApp = function () {

	//  Scope.
	const self = this;


	/*  ================================================================  */
	/*  Helper functions.                                                 */
	/*  ================================================================  */

	/**
	 *  Start the server (starts up the sample application).
	 */
	self.start = function () {

		let app;
		if(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'preview'){
			app = require('./appServer').default;
		}else{
			app = require('./devServer').default;
		}

		app.use('/api', wechatRouter);

		app.use(function(req, res, next) {
			console.error(`404 Error: url=${req.url}`);
			res.status(404).send('<h1>404 Not Found Error</h1>');
		});

		app.use(function(err, req, res, next) {
			if(err.message === '404'){
				console.error(`404 Error: url=${req.url}`);
				res.status(404).send('<h1>404 Not Found Error</h1>');
			}else if('view' in err){
				console.error(`500 Error: url=${req.url} message ${err.message}`);
				res.status(500).send(`<h1>500 Service is restarting</h1>`);
			}else{
				console.error(`503 Error: url=${req.url}`);
				res.status(503).send(`<h1>503 ${err.message || 'Service Unavailable Error'}</h1>`);
			}
		});

		app.listen(config.port, config.host, error => {
			if (error) {
				console.log(error);
			}
			console.log('%s: Node server started on %s:%d ...',
				Date.now(), config.host, config.port);
		});
	};

};
/*  Server Application.  */


/**
 *  main():  Main code.
 */
const zapp = new ServerApp();
zapp.start();

