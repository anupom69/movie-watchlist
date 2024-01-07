import { useEffect, useState } from "react";
const KEY = "bdec1200";
export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(
      function () {
      const controller = new AbortController();
      async function fetchMovieData() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) throw new Error("Cannot fetch data...");
          const data = await res.json();
          if (data.Response === "False") {
            setError("No movies");
            return;
          }
          setMovies(data.Search);
          setError("");
        } catch (error) {
          if (error.name !== "AbortError") {
            console.error(error.message);
            setError(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovieData();
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return {movies, error, isLoading}
}
