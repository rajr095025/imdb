const db = require("./config");

exports.getMovies = async () => {
  try {
    // const getMoviesQuery = "select * from movies";
    const getMoviesQuery = `SELECT 
  m.id AS movieId,
  m.name AS movieName,
  m.year_of_release,
  m.plot,
  m.poster,
  m.producer_id,
  GROUP_CONCAT(a.id SEPARATOR ', ') AS actors
FROM movies m
LEFT JOIN movie_actors ma ON m.id = ma.movie_id
LEFT JOIN actors a ON ma.actor_id = a.id
GROUP BY m.id;`;

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

exports.addMovie = async (name, year, plot, poster, producerId) => {
  try {
    const addMovieQuery = `INSERT INTO movies (name, year_of_release, plot, poster, producer_id) VALUES (?, ?, ?, ?, ?); `;
    const results = await new Promise((resolve, reject) => {
      db.query(
        addMovieQuery,
        [name, year, plot, poster, producerId],
        (error, result) => {
          if (error) {
            reject(error);
            return;
          } else {
            resolve(result);
          }
        }
      );
    });
    return {
      message: "Movie added successfully",
      id: results.insertId,
      results,
    };
  } catch (error) {
    console.log("Error while adding movie", error);
    throw error;
  }
};

exports.editMovie = async (id, name, year, plot, poster, producerId) => {
  try {
    const editMovieQuery = ` UPDATE movies
      SET name = ?, year_of_release = ?, plot = ?, poster = ?, producer_id = ?
      WHERE id = ?`;

    const results = await new Promise((resolve, reject) => {
      db.query(
        editMovieQuery,
        [name, year, plot, poster, producerId, id],
        (error, result) => {
          if (error) {
            reject(error);
            return;
          } else {
            resolve(result);
          }
        }
      );
    });
    return { message: "Movie updated successfully", results };
  } catch (error) {
    console.log("Error while updating movie", error);
    throw error;
  }
};

exports.getMovie = async (id) => {
  try {
    // const getMoviesQuery = "select * from movies";
    const getMoviesQuery = `SELECT 
  m.id AS movieId,
  m.name AS movieName,
  m.year_of_release,
  m.plot,
  m.poster,
  m.producer_id,
  GROUP_CONCAT(a.id SEPARATOR ', ') AS actors
FROM movies m
LEFT JOIN movie_actors ma ON m.id = ma.movie_id
LEFT JOIN actors a ON ma.actor_id = a.id
where m.id = ${id}`;

    const results = await new Promise((resolve, reject) => {
      db.query(getMoviesQuery, (error, result) => {
        if (error) {
          reject(error);
          return;
        } else {
          resolve(result);
        }
      });
    });
    return results?.[0];
  } catch (error) {
    console.log("Error while fetching movies", error);
    throw error;
  }
};

exports.getActors = async () => {
  try {
    // const getActorsQuery = "select * from actors";
    const getActorsQuery = `SELECT 
  a.id AS actorId,
  a.name,
  a.gender,
  a.date_of_birth AS dateOfBirth,
  a.bio,
  GROUP_CONCAT(m.id SEPARATOR ', ') AS movies
FROM actors a
LEFT JOIN movie_actors ma ON a.id = ma.actor_id
LEFT JOIN movies m ON ma.movie_id = m.id
GROUP BY a.id;`;

    const results = new Promise((resolve, reject) => {
      db.query(getActorsQuery, (error, result) => {
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
    console.log("Error while fetching actors", error);
    throw error;
  }
};

exports.addActor = async (name, gender, dateOfBirth, bio) => {
  try {
    const getMoviesQuery = `INSERT INTO actors (name, gender, date_of_birth, bio)
      VALUES (?, ?, ?, ?)`;
    const results = await new Promise((resolve, reject) => {
      db.query(
        getMoviesQuery,
        [name, gender, dateOfBirth, bio],
        (error, result) => {
          if (error) {
            reject(error);
            return;
          } else {
            resolve(result);
          }
        }
      );
    });
    return {
      message: "Actor added successfully",
      id: results.insertId,
      results,
    };
  } catch (error) {
    console.log("Error while adding actor", error);
    throw error;
  }
};

exports.editActor = async (id, name, gender, dateOfBirth, bio) => {
  try {
    const getMoviesQuery = `  UPDATE actors
      SET name = ?, gender = ?, date_of_birth = ?, bio = ?
      WHERE id = ? `;
    const results = await new Promise((resolve, reject) => {
      db.query(
        getMoviesQuery,
        [name, gender, dateOfBirth, bio, id],
        (error, result) => {
          if (error) {
            reject(error);
            return;
          } else {
            resolve(result);
          }
        }
      );
    });
    return {
      message: "Actor updated successfully",
      results,
    };
  } catch (error) {
    console.log("Error while updating actor", error);
    throw error;
  }
};

exports.getProducers = async () => {
  try {
    // const getProducersQuery = "select * from producers";
    const getProducersQuery = `SELECT 
  p.id AS producerId,
  p.name,
  p.gender,
  p.date_of_birth AS dateOfBirth,
  p.bio,
  GROUP_CONCAT(m.id SEPARATOR ', ') AS movies
FROM producers p
LEFT JOIN movies m ON p.id = m.producer_id
GROUP BY p.id;`;

    const results = new Promise((resolve, reject) => {
      db.query(getProducersQuery, (error, result) => {
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
    console.log("Error while fetching producers", error);
    throw error;
  }
};
exports.addProducer = async (name, gender, dateOfBirth, bio) => {
  try {
    const getMoviesQuery = `INSERT INTO producers (name, gender, date_of_birth, bio)
      VALUES (?, ?, ?, ?)`;
    const results = await new Promise((resolve, reject) => {
      db.query(
        getMoviesQuery,
        [name, gender, dateOfBirth, bio],
        (error, result) => {
          if (error) {
            reject(error);
            return;
          } else {
            resolve(result);
          }
        }
      );
    });
    return {
      message: "Producer added successfully",
      id: results.insertId,
      results,
    };
  } catch (error) {
    console.log("Error while adding producer", error);
    throw error;
  }
};

exports.editProducer = async (id, name, gender, dateOfBirth, bio) => {
  try {
    const getMoviesQuery = `  UPDATE producers
      SET name = ?, gender = ?, date_of_birth = ?, bio = ?
      WHERE id = ? `;
    const results = await new Promise((resolve, reject) => {
      db.query(
        getMoviesQuery,
        [name, gender, dateOfBirth, bio, id],
        (error, result) => {
          if (error) {
            reject(error);
            return;
          } else {
            resolve(result);
          }
        }
      );
    });
    return {
      message: "Producer updated successfully",
      results,
    };
  } catch (error) {
    console.log("Error while updating producers", error);
    throw error;
  }
};

exports.addActorToMovie = async (movieId, actorId) => {
  try {
    const movieActorQuery = `
      INSERT INTO movie_actors (movie_id, actor_id)
      VALUES (?, ?)
    `;
    const results = await new Promise((resolve, reject) => {
      db.query(movieActorQuery, [movieId, actorId], (error, result) => {
        if (error) {
          reject(error);
          return;
        } else {
          resolve(result);
        }
      });
    });
    return {
      message: "Movie's actor added successfully",
      results,
    };
  } catch (error) {
    console.log("Error while adding Movie's actor.", error);
    throw error;
  }
};

exports.addActorToMovie = async (movieId, actorId) => {
  try {
    const movieActorQuery = `
      INSERT INTO movie_actors (movie_id, actor_id)
      VALUES (?, ?)
    `;
    const results = await new Promise((resolve, reject) => {
      db.query(movieActorQuery, [movieId, actorId], (error, result) => {
        if (error) {
          reject(error);
          return;
        } else {
          resolve(result);
        }
      });
    });
    return {
      message: "Movie's actor added successfully",
      results,
    };
  } catch (error) {
    console.log("Error while adding Movie's actor.", error);
    throw error;
  }
};

exports.deleteActorFromMovie = async (movieId, actorId) => {
  const deleteQuery = `
    DELETE FROM movie_actors
    WHERE movie_id = ? AND actor_id = ?
  `;

  try {
    const result = await new Promise((resolve, reject) => {
      db.query(deleteQuery, [movieId, actorId], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    return { message: "Movie's actor deleted successfully", result };
  } catch (error) {
    console.error("Error removing actor from movie:", error);
    throw error;
  }
};
