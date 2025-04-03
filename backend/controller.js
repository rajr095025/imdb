const model = require("./model");

exports.getMovies = async (req, res) => {
  try {
    let results = await model.getMovies();

    res.status(200).json({ message: "successfully fetched", movies: results });
  } catch (error) {
    console.log("Error while fetching movies", error);
    res.status(500).json({ message: "Error in fetching Movie", error });
  }
};
