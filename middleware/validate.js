// 验证是否是来自微信的服务
const Sha = require('sha1');

module.exports = option => {
	const token = option.token;
	
	return (ctx, next) => {
		let signature = ctx.query.signature;
		let timestamp = ctx.query.timestamp;
		let nonce = ctx.query.nonce;
		let echostr = ctx.query.echostr;
		let sort = [token, timestamp, nonce].sort().join('');
		let sha1 = Sha(sort);

		if (sha1 === signature) {
			ctx.response.body = echostr;
			next();
		} else {
			console.log(`${ctx.url} is not from wechat server`);
			ctx.response.body = `${ctx.url} is not from wechat server`;
			next(); // 线上要注释掉 非微信发来的请求不能继续向下走
		}
	}
};

