const express = require("express");
const router = express.Router();

const controller = require("./controller");

router.get("/movies", controller.getMovies);

router.post("/movies", controller.addMovie);

router.put("/movies", controller.editMovie);

router.get("/actors", controller.getActors);

router.post("/actors", controller.addActor);

router.put("/actors", controller.editActor);

router.get("/producers", controller.getProducers);

router.post("/producers", controller.addProducer);

router.put("/producers", controller.editProducer);

module.exports = router;
