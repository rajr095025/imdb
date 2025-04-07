const model = require("./model");

// Movies Functions
exports.getMovies = async (req, res) => {
  try {
    let results = await model.getMovies();

    res.status(200).json({ message: "successfully fetched", movies: results });
  } catch (error) {
    console.log("Error while fetching movies", error);
    res.status(500).json({ message: "Error in fetching Movie", error });
  }
};

exports.addMovie = async (req, res) => {
  try {
    const { name, yearOfRelease, plot, poster, producerId, usersList } =
      req.body;
    let results = await model.addMovie(
      name,
      yearOfRelease,
      plot,
      poster,
      producerId
    );
    let movieId = results?.id;

    await Promise.all(
      usersList?.map((actorId) => model.addActorToMovie(movieId, actorId))
    );

    res.status(200).json({ message: "Successfully Added Movie" });
  } catch (error) {
    console.log("Error while Adding movie", error);
    res.status(500).json({ message: "Error while Adding movie", error });
  }
};

exports.editMovie = async (req, res) => {
  try {
    const { name, yearOfRelease, plot, poster, id, producerId, usersList } =
      req.body;

    let results = await model.editMovie(
      id,
      name,
      yearOfRelease,
      plot,
      poster,
      producerId
    );

    let movieDetails = await model.getMovie(id);

    let movieUserList = movieDetails?.actors
      ?.split(",")
      ?.map((userId) => Number(userId));

    let finalUserList = usersList?.filter(
      (userId) => !movieUserList?.includes(userId)
    );

    let finalDeleteUserList = movieUserList?.filter(
      (userId) => !usersList?.includes(userId)
    );

    console.log(
      movieDetails,
      "movieUserList",
      movieUserList,
      "finalUserList",
      finalUserList,
      "finalDeleteUserList",
      finalDeleteUserList
    );

    await Promise.all(
      finalUserList?.map((actorId) => model.addActorToMovie(id, actorId))
    );

    await Promise.all(
      finalDeleteUserList?.map((actorId) =>
        model.deleteActorFromMovie(id, actorId)
      )
    );

    res
      .status(200)
      .json({ message: "successfully Updated Movie", movies: results });
  } catch (error) {
    console.log("Error while updating movie", error);
    res.status(500).json({ message: "Error while updating movie", error });
  }
};

// Actors Functions
exports.getActors = async (req, res) => {
  try {
    let results = await model.getActors();

    res.status(200).json({ message: "successfully fetched", movies: results });
  } catch (error) {
    console.log("Error while fetching actors", error);
    res.status(500).json({ message: "Error in fetching actors", error });
  }
};

exports.addActor = async (req, res) => {
  try {
    const { name, gender, dateOfBirth, bio } = req.body;
    let results = await model.addActor(name, gender, dateOfBirth, bio);

    res.status(200).json({ message: "Actor successfully added" });
  } catch (error) {
    console.log("Error while adding actor", error);
    res.status(500).json({ message: "Error while adding actor", error });
  }
};

exports.editActor = async (req, res) => {
  try {
    const { id, name, gender, dateOfBirth, bio } = req.body;
    let results = await model.editActor(id, name, gender, dateOfBirth, bio);

    res.status(200).json({ message: "successfully updated actor" });
  } catch (error) {
    console.log("Error while updating actor", error);
    res.status(500).json({ message: "Error while updating actor", error });
  }
};

// Producers Functions
exports.getProducers = async (req, res) => {
  try {
    let results = await model.getProducers();

    res.status(200).json({ message: "successfully fetched", movies: results });
  } catch (error) {
    console.log("Error while fetching producers", error);
    res.status(500).json({ message: "Error in fetching producers", error });
  }
};

exports.addProducer = async (req, res) => {
  try {
    const { name, gender, dateOfBirth, bio } = req.body;
    let results = await model.addProducer(name, gender, dateOfBirth, bio);

    res.status(200).json({ message: "Producer successfully added" });
  } catch (error) {
    console.log("Error while adding Producer", error);
    res.status(500).json({ message: "Error while adding Producer", error });
  }
};

exports.editProducer = async (req, res) => {
  try {
    const { id, name, gender, dateOfBirth, bio } = req.body;
    let results = await model.editProducer(id, name, gender, dateOfBirth, bio);

    res.status(200).json({ message: "successfully updated producer" });
  } catch (error) {
    console.log("Error while updating Producer", error);
    res.status(500).json({ message: "Error while updating Producer", error });
  }
};
