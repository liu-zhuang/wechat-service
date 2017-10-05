const Router =  require('koa-router');
const Sha = require('sha1');
const options = require('../config/options');
const ContentMessage = require('../util/Message').ContentMessage;

const router = app => {
	const router = new Router();

	router.all('/wechat-get', (ctx, next) => {
		let {signature, timestamp, nonce, echostr} = ctx.query;
		let sort = [options.wechat.token, timestamp, nonce].sort().join('');
		let sha1 = Sha(sort);

		if (ctx.method === 'GET') {
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
		} else if (ctx.method === 'POST') {
			if (sha1 === signature) {
				// 处理请求
				let msg = ctx.request.body.xml;
				app.logger.debug({
					body: JSON.stringify(msg)
				});
				let contentMsgInfo = new ContentMessage(msg.ToUserName[0],msg.FromUserName[0], msg.CreateTime[0], msg.MsgType[0], msg.MsgId[0], msg.Content[0]);
				app.logger.debug({
					contentMsgInfo: JSON.stringify(contentMsgInfo)
				});		
				// let retMsgJson = {
				// 	"xml": {
				// 		"ToUserName": contentMsgInfo.FromUserName,
				// 		"FromUserName": contentMsgInfo.ToUserName,
				// 		"CreateTime": + new Date(),
				// 		"MsgType": 'text',
				// 		"Content": '收到，谢谢！'
				// 	}
				// };
				let retMsgJson = {};
				if (contentMsgInfo.Content === "入职") {
					retMsgJson = {
						"xml": {
							"ToUserName": contentMsgInfo.FromUserName,
							"FromUserName": contentMsgInfo.ToUserName,
							"CreateTime": + new Date(),
							"MsgType": 'news',
							"ArticleCount": 1,
							"Articles": [{
								"item": {
									"Title": "欢迎加入沃尔沃",
									"Description": "我们所做的均以人为中心，因此我们所做的每一次创新都是为了简化和改善您的生活。我们对高效动力、智能人车沟通系统和安全等方面的进步感到骄傲。",
									"PicUrl": "https://assets.volvocars.com/zh-cn/~/media/china/images/cars/v90cc/landing/20170316/storygrid02marketlaunch_v90cc_bridge_withoutkayak.jpg?w=1266",
									"Url": "http://elemefe.github.io/mint-ui/#/"
								}

							}]
						}
					};
				} else {
					retMsgJson = {
						"xml": {
							"ToUserName": contentMsgInfo.FromUserName,
							"FromUserName": contentMsgInfo.ToUserName,
							"CreateTime": + new Date(),
							"MsgType": 'news',
							"ArticleCount": 1,
							"Articles": [{
								"item": {
									"Title": "收到您的消息",
									"Description": "随兴所驭，尽揽沿途美景",
									"PicUrl": "https://assets.volvocars.com/zh-cn/~/media/china/images/cars/v90cc/landing/20170316/v90crosscountry_gallery_02.jpg?w=850",
									"Url": "https://www.volvocars.com/zh-cn/cars/new-models/v90-cross-country"
								}

							}]
						}
					};
				}
				var json2xml = require('json2xml');
				let retMsgXml = json2xml(retMsgJson);
				ctx.body = retMsgXml;
				next();
			} else {
				ctx.response.body = 'Fail';
				app.logger.debug({
					msg: 'validate fail'
				});
			}
		}
	});
	app.use(router.routes());
	app.use(router.allowedMethods());
}

module.exports = router;