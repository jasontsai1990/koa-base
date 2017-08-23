'use strict'

let Router = require('koa-router')
let home = new Router()

// home
home.get('/', async (ctx, next) => {
    await ctx.render('index', {title:1})
    await next()
})

module.exports = home