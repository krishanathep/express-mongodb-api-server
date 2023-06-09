const Blogs = require("../models/blogs");
const fs = require('fs')

exports.create = async (req, res) => {
  try {
    var data = req.body
    if (req.file) {
      data.file = req.file.filename
    }
    const newBlogs = await new Blogs(data).save();
    console.log(newBlogs)
    res.status(200).send(newBlogs);
  } catch (err) {
    console.log(err);
    res.status(400).send("Server Create is Error!!");
  }
};

exports.list = async (req, res) => {
  try {
    const listBlogs = await Blogs.find({}).exec();
    console.log(listBlogs);
    res.status(200).send(listBlogs);
  } catch (err) {
    console.log(err);
    res.status(400).send("Server List is Error!!");
  }
};

exports.read = async (req, res) => {
  try {
    const id = req.params.id;
    const readBlog = await Blogs.findById(id);
    console.log(readBlog);
    res.json(readBlog);
  } catch (err) {
    console.log(err);
    res.status(400).send("Server Read is Error!!");
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const option = { new: true };
    const updateBlog = await Blogs.findByIdAndUpdate(
      id,
      updateData,
      option
    ).exec();
    console.log(updateBlog);
    res.status(200).send(updateBlog);
  } catch (err) {
    console.log(err);
    res.status(400).send("Server Update is Error!!");
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteBlog = await Blogs.findByIdAndDelete(id).exec();
    await fs.unlink('./uploads/' + this.remove.file, (error)=>{
      if(error){
        console.log(error)
      } else {
        console.log('Remove success')
      }
    })
    console.log(deleteBlog)
    res.status(200).send(deleteBlog)
  } catch (err) {
    console.log(err);
    res.status(400).send("Server Delete is Error!!");
  }
};
