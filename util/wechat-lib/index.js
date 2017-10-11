const axios = require('axios');
const baseUrl = 'https://api.weixin.qq.com/cgi-bin/';
const api = {
	accessToken: baseUrl + 'token'
}
class Wechat {
	constructor (opts) {
		this.opts = Object.assign({}, opts);
		this.appID = opts.appID;
		this.appSecret = opts.appSecret;
		this.getAccessToken = opts.getAccessToken;
		this.saveAccessToken = opts.saveAccessToken;
	}

	async request (url, params) {
		axios.get(url, {
			params
		})
		.then(res => {
			if (res.status === 200) {
				return res.data;
			}
		})
		.catch(err => {
			this.app.logger.error(err);
		})
	}

	async fetchAccessToken () {
		let token = this.getAccessToken();
		if (validateToken(token)) {
			return token;
		} else {
			token = this.request(api.accessToken, {
				grant_type: 'client_credential',
				appid: this.appID,
				secret: this.appSecret
			});
			this.updateAccessToken(token);
		}
	}

	async updateAccessToken (data) {
		this.saveAccessToken(data);
	}

	validateToken (token) {
		// 如果token为空，则验证失败
		if (!token || !token.token) {
			return false;
		}
		// 如果token已过期，则验证失败
		if (token.expires_in > + new Date()) {
			return true;
		} else {
			return false;
		}
	}
}