const Koa = require('koa');
const Sha = require('sha1');
const validate = require('./middleware/validate.js');
const accessToken = require('./middleware/accessToken.js');
const logger = require('./middleware/logger.js');

const app = new Koa();

const config = {
	token: 'yebaomemeda'
};

app.use(logger);

app.use(validate(config));

app.use(accessToken.getAccessToken);

app.listen(8080);

console.log('server is running at 8080');