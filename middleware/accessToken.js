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

const getAccessToken = async (ctx, next) => {
	devLog('getAccessToken:type:', ctx.response.type);
	const appid = config.appid;
	const appsecret = config.secret;
	let url = api.accessToken + `&appid=${appid}&secret=${appsecret}`;
	await axios.get(url)
	.then(res => {
		devLog(res.data);
		// ctx.response.body += res.data;
	});
	return next();
};


module.exports = {
	getAccessToken
};


