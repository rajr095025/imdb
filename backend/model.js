const db = require("./config");

exports.getMovies = async (req, res) => {
  try {
    const getMoviesQuery = "select * from movies";
    const results = new Promise((resolve, reject) => {
      db.query(getMoviesQuery, (error, result) => {
        if (error) {
          reject(error);
          return;
        } else {
          resolve(result);
        }
      });
    });
    return results;
  } catch (error) {
    console.log("Error while fetching movies", error);
    throw error;
  }
};
