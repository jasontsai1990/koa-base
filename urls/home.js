'use strict'

let Router = require('koa-router')
let home = new Router()

// // path => localhost:3000/home/a/b/c
home.get('/a/b/c', async (ctx, next) => {
    await ctx.render('index', {title:1})
    await next()
})

module.exports = home