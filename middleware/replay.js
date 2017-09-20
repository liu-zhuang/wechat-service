const util = require('./util.js');


module.exports = async (ctx, next) => {
	const method = ctx.method;
	console.log(method);
	debugger;
	// 如果是POST请求，同时是XML的话，则执行xml解析
	if(method === 'POST') {
		let promise = new Promise(function (resolve, reject) {
			let buf = '';
			ctx.req.setEncoding('utf8');
			ctx.req.on('data', (chunk) => {
				debugger;
				buf += chunk
			});
			ctx.req.on('end', () => {
				debugger;
				util.xml2jsParser(buf)
				.then(resolve)
				.catch(reject);
			})
		});

		await promise.then(result => {
			debugger;
			console.log(result);
		})
		.catch(err => {
			debugger;
			console.log(err);
		});
		next();
	} else {
		next();	
	}
};

