const express = require('express');
const Mongoose  = require('mongoose');
const path = require('path');
const shortid = require('shortid')

// Importing the model here
const BlogModel = Mongoose.model('Blog')


let testRoute = (req, res) => {
    console.log(req.params)
    res.send(req.params)
}

let testQuery = (req, res) => {
    console.log(req.query)
    res.send(req.query)
}

let testBody = (req, res) => {
    console.log("Hii");
    console.log(req.body)
    res.send(req.body)
}

let getAllBlog = (req, res) => {
    BlogModel.find()
        .select('-_v -_id')
        .lean()
        .exec( (err, result) => {
            if(err){
                console.log(err)
                res.send(err)
            }else if(result == undefined || result == null || result == ''){
                console.log('No Blogs Find')
                res.send("No Blogs Find")
            }else{
                res.send(result)
            }
        })
}

let viewByBlogId = (req, res) => {
    BlogModel.findOne({'blogId': req.params.blogId}, (err, result) => {
        if(err){
            console.log(err)
            res.send(err)
        }else if(result == undefined || result == null || result == ''){
            console.log('No Blogs Find')
            res.send("No Blogs Find")            
        }else{
            res.send(result)
        }
    })
}

let viewByCategory = (req, res) => {
    BlogModel.findOne({'categeory': req.params.catgeory}, (err, result) => {
        if(err){
            console.log(err)
            res.send(err)
        }else if(result == undefined || result == null || result == ''){
            console.log('No Blogs Find')
            res.send("No Blogs Find")            
        }else{
            res.send(result)
        }
    })
}

let viewByAuthor = (req, res) => {
    BlogModel.findOne({'author': req.params.author}, (err, result) => {
        if(err){
            console.log(err)
            res.send(err)
        }else if(result == undefined || result == null || result == ''){
            console.log('No Blogs Find')
            res.send("No Blogs Find")            
        }else{
            res.send(result)
        }
    })
}

let createBlog = (req, res) => {
    let today = Date.now()
    let blogId = shortid.generate();

    let newBlog = new BlogModel({
        blogId: blogId,
        title: req.body.title,
        description: req.body.description,
        bodyHtml: req.body.blogBody,
        isPublished: true,
        catgeory: req.body.category,
        author: req.body.fullName,
        created: today,
        lastModified: today
    })

    let tags = (req.body.tags != null && req.body.tags != undefined && req.body.tags != '') ? req.body.tags.split(',') : []

    newBlog.tags = tags

    newBlog.save( (err, result) => {
        if(err){
            console.log(err)
            res.send(err)
        }else{
            res.send(result)
        }
    })
}

let editBlog = (req, res) => {
    let options = req.body
    console.log(options)

    BlogModel.updateOne({'blogId': req.params.blogId}, options, {multi: true}).exec( (err, result) => {
        if(err){
            console.log(err)
            res.send(err)
        }else if(result == undefined || result == null || result == ''){
            console.log("No Blog Found");
            res.send("No Blog Found")
        }else{
            res.send(result)
        }
    })
}

let deleteBlog = (req, res) => {
    BlogModel.deleteOne({'blogId': req.params.blogId}, (err, result) => {
        if(err){
            console.log(err);
            res.send(err)
        }else if(result == undefined || result == null || result == ''){
            console.log("No Blog Found")
            res.send("No Blog Found")
        }else{
            res.send(result)
        }
    })
}

let increaseBlogView  = (req, res) => {
    BlogModel.findOne({'blogId': req.params.blogId}, (err, result) => {
        if(err){
            console.log(err)
            res.send(err)
        }else if(result == undefined || result == '' || result == null){
            console.log("No Blog Found")
            res.send("No Blog Found")
        }else{
            result.views += 1
            result.save( (err, result) => {
                if(err){
                    console.log(err)
                    res.send(err)
                }else{
                    console.log("Blog updated successfully")
                    res.send(result)
                }
            })
        }
    })
}

module.exports = {
    testBody: testBody,
    testQuery: testQuery,
    testRoute: testRoute,

    getAllBlog: getAllBlog,
    createBlog: createBlog,
    viewByBlogId: viewByBlogId,
    viewByCategory: viewByCategory,
    viewByAuthor: viewByAuthor,
    editBlog: editBlog,
    deleteBlog: deleteBlog,
    increaseBlogView: increaseBlogView

}