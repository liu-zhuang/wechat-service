// 验证是否是来自微信的服务

const Sha = require('sha1');

module.exports = option => {
	const token = option.token;

	return async (ctx, next) => {
		let signature = ctx.query.signature;
		let timestamp = ctx.query.timestamp;
		let nonce = ctx.query.nonce;
		let echostr = ctx.query.echostr;
		let sort = [token, timestamp, nonce].sort().join('');
		let sha1 = Sha(sort);

		if (sha1 === signature) {
			ctx.response.body = echostr;
			await next();
		} else {
			ctx.response.body = `${ctx.url} is not from wechat server`;
		}
	}
}