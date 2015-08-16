import Http from 'http';
import Express from 'express';
import LiveReload from 'express-livereload';

import configApiRoutes from './config/api.routes';
import configAppRoutes from './config/app.routes';

export var App = new Express();
export var ApiRouter = new Express.Router();
export var Router = new Express.Router();

configApiRoutes(ApiRouter);
configAppRoutes(Router);

App.use('/api', ApiRouter);
App.use('/', Router);

if (process.argv.indexOf('--dev') >= 0) {
	console.log('Running LiveReload...')
	LiveReload(App, {
		watchDir: './pub'
	});
}

export var Server = App.listen(8080, 'localhost', () => {
	var host = Server.address().address,
		port = Server.address().port;

	console.log('Listening at http://%s:%s', host, port);
});
