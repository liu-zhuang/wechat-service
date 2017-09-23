class Message {
	constructor (ToUserName, FromUserName, CreateTime, MsgType, MsgId) {
		this.ToUserName = ToUserName;
		this.FromUserName = FromUserName;
		this.CreateTime = CreateTime;
		this.MsgType = MsgType;
		this.MsgId = MsgId;
	}
}
class ContentMessage extends Message {
	constructor(ToUserName, FromUserName, CreateTime, MsgType, MsgId, Content) {
		super(ToUserName, FromUserName, CreateTime, MsgType, MsgId);
		this.Content = Content;
	}
}
module.exports = {
	Message,
	ContentMessage
}