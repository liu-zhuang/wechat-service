// 验证是否是来自微信的服务
const Sha = require('sha1');
const devLog = require('debug')('dev'); 

module.exports = option => {
	const token = option.token;
	
	return (ctx, next) => {
		devLog('validate:type:', ctx.response.type);
		let {signature, timestamp, nonce, echostr} = ctx.query;
		let sort = [token, timestamp, nonce].sort().join('');
		let sha1 = Sha(sort);
		if (sha1 === signature) {
			// 如果是方法，把echostr原样返回即可
			if (ctx.method === 'GET') {
				ctx.response.body = echostr;
				return next();
			} else if (ctx.method === 'POST') {
				// 处理请求
				return next();
			} else {
				
			}
		} else {
			console.log(`${ctx.url} is not from wechat server`);
			// ctx.response.body = `${ctx.url} is not from wechat server`;
			return next(); // 线上要注释掉 非微信发来的请求不能继续向下走
		}
	}
};

