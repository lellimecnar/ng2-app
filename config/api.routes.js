export default (Router) => {
	Router.get('/test', (req, res, next) => {
		res.json({
			msg: 'test'
		});
	});
}
