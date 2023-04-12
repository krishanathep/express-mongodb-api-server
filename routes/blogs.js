const express = require("express")
const router = express.Router()
const {create,list} = require("../controllers/blogsController")

router.post('/blogs',create)
router.get('/blogs',list)

module.exports=router