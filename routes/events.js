const express = require("express");
const router = express.Router();
const { create, list, read, update, remove } = require('../controllers/eventsController');

router.post("/events", create);
router.get("/events", list);
router.get("/events/:id", read);
router.put("/events/:id", update);
router.delete("/events/:id", remove);

module.exports = router;