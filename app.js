const Koa = require('koa');
const Sha = require('sha1');
const validate = require('./middleware/validate.js');

const app = new Koa();

const config = {
	token: 'yebaomemeda'
};

app.use(validate(config));

app.listen(8080);

console.log('server is running at 8080');