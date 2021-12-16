const express = require('express');
const appConfig = require('../config/appConfig')
const blogControllers = require('../controllers/blogControllers');

let setRouter = (app) => {
    let baseUrl = '/' + appConfig.apiVersion + '/blogs';

    console.log(baseUrl)

    app.get('/test/route/:parm1/:parm2', blogControllers.testRoute)
    app.get('/test/query', blogControllers.testQuery)
    app.post('/test/body', blogControllers.testBody)

    app.get(baseUrl+'/all', blogControllers.getAllBlog)
    app.get(baseUrl+'/view/by/blogId/:blogId', blogControllers.viewByBlogId)
    app.get(baseUrl+'/view/by/author/:author', blogControllers.viewByAuthor)
    app.get(baseUrl+'/view/by/category/:category', blogControllers.viewByAuthor)
    app.get(baseUrl+'/:blogId/count/view', blogControllers.increaseBlogView)

    app.post(baseUrl+'/:blogId/delete', blogControllers.deleteBlog)
    app.post(baseUrl+'/create', blogControllers.createBlog)

    app.put(baseUrl+'/:blogId/edit', blogControllers.editBlog)
}

module.exports = {
    setRouter: setRouter
}