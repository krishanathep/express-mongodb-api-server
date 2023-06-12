const express = require("express");
const router = express.Router();
const { create, list, read, update, remove } = require("../controllers/blogsController");

const { auth } = require("../Middleware/auth")

router.post("/blogs", create);
router.get("/blogs", auth, list);
router.get("/blogs/:id", read);
router.put("/blogs/:id", update);
router.delete("/blogs/:id", remove);

module.exports = router;
