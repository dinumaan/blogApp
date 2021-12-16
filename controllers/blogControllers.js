const express = require('express');
const path = require('path');

let printHelloWorld = (req, res) => {
    res.send("print helloWorld");
}

module.exports = {
    printHelloWorld: printHelloWorld,
}