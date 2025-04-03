const express = require("express");
const router = express.Router();

const controller = require("./controller");

router.get("/movies", controller.getMovies);

module.exports = router;
