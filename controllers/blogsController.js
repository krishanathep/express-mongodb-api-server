const Blogs = require("../models/blogs")

exports.create=async(req,res)=>{
    try {
        //code
        const newBlogs = await new Blogs(req.body).save()
        console.log(newBlogs)
        res.status(200).send(newBlogs)
    } catch(err){
        //check error
        console.log(err)
        res.status(400).send("Server Create is Error!!")
    }
}

exports.list=async(req,res)=>{
    try {
        const listBlogs = await Blogs.find({}).exec()
        console.log(listBlogs)
        res.status(200).send(listBlogs)
    } catch(err) {
        console.log(err)
        res.status(400).send("Server List is Error!!")
    }
}