const path = require('path')
const Koa = require('koa')
const favicon = require('koa-favicon')
const compression = require('koa-compress')
const logger = require('koa-logger')
const bluebird = require('bluebird')
const chalk = require('chalk')

global.Promise = bluebird

const isProd = process.env.NODE_ENV === 'production'

const rootPath = path.resolve(__dirname, '../')

const resolve = file => path.resolve(rootPath, file)

// create koa instance
const app = new Koa()

const router = require('./router')(app)

// cache static
const serve = (filepath, cache) => require('koa-static')(resolve(filepath), {
  maxage: cache && isProd ? 60 * 60 * 24 * 30 : 0
})
const intercepter = require('../src/interceptor');
// 外部配置文件覆盖仓库配置，第一个参数可为配置文件或端口
global.config = intercepter.initConfig(process.argv[2], process.argv[3]);
global.initConfig = {clientApiHost: global.config.getClientApiHost()};

app.proxy = true
app.use(logger())
// app.use(compression({
//   threshold: 2048,
//   flush: require('zlib').Z_SYNC_FLUSH
// }))
app.use(favicon('../static/favicon.ico'));
app.use(serve('assets', true));
app.use(serve('dist', true));
app.use(intercepter.initSiteType());

app.use(async (ctx, next) => {
  ctx.set('m', 'devMachine');
  await next()
})

app.use(router.routes()).use(router.allowedMethods())

// page not found
app.use((ctx, next) => {
  ctx.type = 'html'
  ctx.body = '404 | Page Not Found'
})

const port = global.config.getPort() || process.env.PORT || 3000
app.listen(port, () => {
  console.log('\n--------- Started ---------')
  console.log(chalk.bold('NODE_ENV:'), chalk.keyword('orange').bold(process.env.NODE_ENV || 'development'))
  const url = `http://127.0.0.1:${port}`
  console.log(chalk.bold('SERVER:'), chalk.blue.bold(url))
  console.log('---------------------------\n')
})
