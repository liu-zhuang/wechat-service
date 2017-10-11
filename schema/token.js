const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
	name: String,
	token: string,
	expires_in: Number,
	meta: {
		createTime: {
			type: Date,
			default: Date.now()
		},
		updateTime: {
			type: Date,
			default: Date.now()
		}
	}
});

const Token = mongoose.model('Token', TokenSchema);

TokenSchema.pre('save', function (next) {
	if (this.isNew) {
		this.meta.createTime = Date.now();
		this.meta.updateTime = Date.now();
	} else {
		this.meta.updateTime = Date.now();
	}
	next();
});

TokenSchema.statics = {
	async getAccessToken () {
		const token = await this.findOne({
			name: 'access_token'
		}).exec();
		return token;
	}
	async saveAccessToken(data) {
		const token = await this.findOne({
			name: 'access_token'
		}).exec();
		if (token) {
			token.token = data.token;
			token.expires_in = data.expires_in;
		} else {
			token = new Token({
				name: 'access_token',
				token: data.token,
				expires_in: data.expires_in
			});
		}
		await token.save();
		return data;
	}
};