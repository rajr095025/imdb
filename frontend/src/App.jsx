import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import MoviesList from "./components/MoviesList";

function App() {
  let router = createBrowserRouter([
    {
      path: "",
      element: <MoviesList></MoviesList>,
    },
  ]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
