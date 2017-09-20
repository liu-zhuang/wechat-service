const util = require('./util.js');

module.exports = () => {
	return async (ctx, next) => {
		if (ctx.method === 'POST' && ctx.is('text/xml')) {
			let promise = new Promise((resolve, reject) =>{
				let buf = ''
				ctx.req.setEncoding('utf8');
				ctx.req.on('data', (chunk) => {
					buf += chunk;
				});
				ctx.req.on('end', () => {
					util.xml2jsParser(buf)
					.then(resolve)
					.catch(reject);
				});
			});

			await promise.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.log(err);
			});
			next();
		} else {
			next();
		}
	};
};