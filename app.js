const Koa = require('koa');
const Sha = require('sha1');
const bodyParser = require('koa-bodyparser');
const validate = require('./middleware/validate.js');
const accessToken = require('./middleware/accessToken.js');
const logger = require('./middleware/logger.js');
const reply = require('./middleware/replay.js');

const app = new Koa();

const config = {
	token: 'yebaomemeda'
};

app.use(bodyParser());

app.use(logger);

app.use(validate(config));

app.use(accessToken.getAccessToken);

app.use(reply);

app.listen(8080);

console.log('server is running at 8080');