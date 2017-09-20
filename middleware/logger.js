// 记录日志

const fs = require('fs');
const path = require('path');
const moment = require('moment');


const logPath = path.join(path.dirname(__dirname),'logs');

module.exports = async (ctx, next) => {
	new Promise ((resolve, reject)=>{
		setTimeout(()=>{
			fs.writeFile(logPath + '/log.txt', moment().format() + '\r\n' +  JSON.stringify(ctx) + '\r\n', {'flag': 'a'}, (err, data) => {
				if (err) {
					console.log(err);	
				}
				resolve();
			});
		},2000);
	});
	next();
}