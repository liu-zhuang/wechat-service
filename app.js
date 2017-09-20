const Koa = require('koa');
const Sha = require('sha1');
const xmlParser = require('koa-xml-body');
const bodyParser = require('koa-bodyparser');
const validate = require('./middleware/validate.js');
const accessToken = require('./middleware/accessToken.js');
const logger = require('./middleware/logger.js');
// const reply = require('./middleware/replay.js');
// const xmlParse = require('./middleware/xmlParse.js');

const app = new Koa();

const config = {
	token: 'yebaomemeda'
};

app.use(xmlParser());

app.use(bodyParser());

app.use((ctx, next) =>{
	ctx.body = ctx.request.body;
	console.log(ctx.body);
	next();
});

app.use(logger);

app.use(validate(config));

app.use(accessToken.getAccessToken);

app.use((ctx, next) => {
	if(ctx.method === 'POST' && ctx.is('text/xml')) {
		ctx.res.setHeader('Content-Type', 'application/xml')
		ctx.res.end(result)
	}
});

// app.use(reply);
// app.use(xmlParse());

app.listen(8080);

console.log('server is running at 8080');