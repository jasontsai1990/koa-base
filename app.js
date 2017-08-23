'use strict'

let koa = require('koa')
let static_ = require('koa-static')
let Router = require('koa-router')
let bodyParser = require('koa-bodyparser')
let views = require('koa-views')
let path = require('path')
let fs = require('fs')

let app = new koa()
let router = new Router()

// static
app.use(static_(
    path.join(__dirname, './static')
))

// bodyParser
app.use(bodyParser())

// views
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}))

// utils
app.use(async (ctx, next) => {
    ctx.util = {
        logger: require('./utils/log'),
        mysql: require('./utils/mysql')
    }
    await next()
})

// router
let urls = fs.readdirSync(__dirname + '/urls')
urls.forEach((element) => {
    let module = require(__dirname + '/urls/' + element)
    router.use('/', module.routes(), module.allowedMethods())
})
app.use(router.routes())


// server error
app.on('error', (err, ctx) => {
    console.log(err)
    ctx.util.logger.info('server error - ' + 'url:' + ctx.request.url + ' - IP:' + ctx.request.ip)
})

app.listen(3000)