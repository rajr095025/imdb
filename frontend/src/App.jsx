import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState();

  async function getMovies() {
    try {
      const results = await fetch("http://localhost:8000/imdb/movies");

      const responseData = await results.json();
      console.log("results ", responseData);

      setMovies(responseData.movies);
    } catch (error) {
      console.log("Error while fetching Movies : ", error);
    }
  }
  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <h2 className="text-3xl text-center font-title">IMDB</h2>
      <div>
        {movies?.length > 0 ? (
          <ul className="m-4 flex gap-4 flex-wrap">
            {movies?.map((movie) => (
              <li className=" border-2 w-96 p-4">
                <p>
                  <strong>Name : </strong>
                  {movie?.name}
                </p>
                <p>
                  <strong>Year Of Release : </strong>
                  {movie.year_of_release}
                </p>
                <p>
                  <strong>Plot : </strong>
                  {movie.plot}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No Movies Found</p>
        )}
      </div>
    </>
  );
}

export default App;
