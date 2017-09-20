// 工具 中间件

const xml2js = require('xml2js');

const xml2jsParser = xml => {
	return new Promise((resolve, reject) => {
		xml2js.parseString(xml, (err, result) => {
			if (err) {
				debugger;
				reject(err);
			} else {
				debugger;
				resolve(result);
			}
		})
	});
}


module.exports = {
	xml2jsParser
}