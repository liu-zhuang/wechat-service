// 记录日志

const fs = require('fs');
const path = require('path');
const moment = require('moment');


const logPath = path.join(path.dirname(__dirname),'logs/');

module.exports = async (ctx, next) => {
	new Promise ((resolve, reject)=>{
		setTimeout(()=>{
			fs.writeFile(logPath + moment().format('YYYYMMDD') + '.txt',
			 moment().format('YYYYMMDD HH:mm:ss') + '\r\n ' +  `${ctx.method}:${ctx.url}` + '\r\n body:' + JSON.stringify(ctx.request.body) + '\r\n', {'flag': 'a'}, (err, data) => {
				if (err) {
					console.log(err);	
				}
				resolve();
			});
		},2000);
	});
	next();
}