// 对AccessToken的操作
const axios = require('axios');
const devLog = require('debug')('dev'); 
const config = {
	appid: 'wx2bb48447b79d4ceb',
	secret: '4bf4428e3e2e08e21fe3f66b6b718051'
};

const api = {
	accessToken: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential'
};

const getAccessToken = (ctx, next) => {
	devLog('getAccessToken:type:', ctx.response.type);
	const appid = config.appid;
	const appsecret = config.secret;
	let url = api.accessToken + `&appid=${appid}&secret=${appsecret}`;
	devLog('axios:type:', JSON.stringify(ctx.response));
	axios.get(url)
	.then(res => {
		// devLog(res.data);
		// devLog('axios:type:', JSON.stringify(ctx.response));
		// ctx.response.type = 'json';
		//  ctx.response.body += res.data;
		// devLog('axios:type:temp:', JSON.stringify(temp.response));
		// ctx = temp;
		// return next();
		devLog(res);
		return next();
	})
	.catch(err => {
		devLog(err);
	})
};


module.exports = {
	getAccessToken
};


