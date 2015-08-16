import Express from 'express';
import Path from 'path';

export default (Router) => {
	Router.use(Express.static(Path.join(process.cwd(),'pub')));
}
