const express = require("express");
const router = express.Router();
const { create, list, read, update, remove } = require("../controllers/blogsController");

const { upload } = require('../Middleware/upload')

router.post("/blogs",upload, create);
router.get("/blogs", list);
router.get("/blogs/:id", read);
router.put("/blogs/:id", update);
router.delete("/blogs/:id", remove);

module.exports = router;
