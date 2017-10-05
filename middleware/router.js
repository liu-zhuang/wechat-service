const Router =  require('koa-router');
const Sha = require('sha1');
const options = require('../config/options');
const ContentMessage = require('../util/Message').ContentMessage;

const router = app => {
	const router = new Router();
	router.get('/wechat-get', (ctx, next) => {
		let {signature, timestamp, nonce, echostr} = ctx.query;
		let sort = [options.wechat.token, timestamp, nonce].sort().join('');
		let sha1 = Sha(sort);
		if (sha1 === signature) {
			ctx.response.body = echostr;
			app.logger.debug({
				msg: 'validate success'
			});
			next();
		} else {
			ctx.response.body = 'Fail';
			app.logger.debug({
				msg: 'validate fail'
			});
		}
	});

	router.post('/wechat-get', (ctx, next) => {
		// 处理请求
		let msg = ctx.request.body.xml;
		app.logger.debug({
			body: JSON.stringify(msg)
		});
		let contentMsgInfo = new ContentMessage(msg.ToUserName[0],msg.FromUserName[0], msg.CreateTime[0], msg.MsgType[0], msg.MsgId[0], msg.Content[0]);
		app.logger.debug({
			contentMsgInfo: JSON.stringify(contentMsgInfo)
		});		
		let retMsgJson = {
			"xml": {
				"ToUserName": contentMsgInfo.FromUserName,
				"FromUserName": contentMsgInfo.ToUserName,
				"CreateTime": + new Date(),
				"MsgType": 'text',
				"Content": '收到，谢谢！'
			}
		};
		var json2xml = require('json2xml');
		let retMsgXml = json2xml(retMsgJson);
		ctx.body = retMsgXml;
		next();
	});

	app.use(router.routes());
	// app.use(router.allowMethods());
}

module.exports = router;