const express = require('express');

const blogControllers = require('../controllers/blogControllers');

let setRouter = (app) => {
    app.get('/hello-world', blogControllers.printHelloWorld);
}

module.exports = {
    setRouter: setRouter
}