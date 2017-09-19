const Koa = require('koa');
const Sha = require('sha1');

const app = new Koa();

const main = ctx => {
	ctx.response.type = 'html';
	ctx.response.body = '<h1>wechat</h1>'
}

app.use(main);

app.listen(8001);

console.log('server is running at 8001');