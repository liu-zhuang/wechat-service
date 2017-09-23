// 验证是否是来自微信的服务
const Sha = require('sha1');
const devLog = require('debug')('dev'); 
var json2xml = require('json2xml');
const ContentMessage = require('../util/Message').ContentMessage;

module.exports = option => {
	const token = option.token;
	
	return (ctx, next) => {
		let {signature, timestamp, nonce, echostr} = ctx.query;
		let sort = [token, timestamp, nonce].sort().join('');
		let sha1 = Sha(sort);
		if (sha1 !== signature) {
			// 如果是方法，把echostr原样返回即可
			if (ctx.method === 'GET') {
				ctx.response.body = echostr;
				return next();
			} else if (ctx.method === 'POST') {
				// 处理请求
				let msg = ctx.request.body.xml;
				devLog(msg.xml);
				let contentMsgInfo = new ContentMessage(msg.ToUserName[0],msg.FromUserName[0], msg.CreateTime[0], msg.MsgType[0], msg.MsgId[0], msg.Content[0]);
				devLog(contentMsgInfo);
				let retMsgJson = {
					"ToUserName": contentMsgInfo.FromUserName,
					"FromUserName": contentMsgInfo.ToUserName,
					"CreateTime": + new Date(),
					"MsgType": 'text',
					"Content": '收到，谢谢！'
				};
				devLog(retMsgJson);
				let retMsgXml = json2xml(retMsgJson);
				ctx.type = 'appliction/xml';
				ctx.body = retMsgXml;
				return next();
			} else {
				
			}
		} else {
			devLog(`${ctx.url} is not from wechat server`);
			// ctx.response.body = `${ctx.url} is not from wechat server`;
			return next(); // 线上要注释掉 非微信发来的请求不能继续向下走
		}
	}
};

