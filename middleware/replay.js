
module.exports = async (ctx, next) => {
	const method = ctx.method;
	console.log(method);
	if(method === 'POST') {
		console.log(ctx.request.body);
		return '';
	}
	next();
};

