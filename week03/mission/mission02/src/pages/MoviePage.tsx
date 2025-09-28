import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import type { Movie, Movies } from "../types/movies";
import axios from "axios";
import MovieCard from "../components/MovieCard";

const MoviePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const location = useLocation();

  useEffect(() => {
    const loadMovies = async () => {
      let endpoint = "popular";
      if (location.pathname === "/playing") endpoint = "now_playing";
      else if (location.pathname === "/top_rated") endpoint = "top_rated";
      else if (location.pathname === "/upcoming") endpoint = "upcoming";

      const { data } = await axios.get<Movies>(
        `https://api.themoviedb.org/3/movie/${endpoint}?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        }
      );

      setMovies(data.results);
    };

    loadMovies();
  }, [location.pathname]);

  return (
    <ul className="container mx-auto px-16 py-4 grid grid-cols-6 gap-2">
      {movies.map((m) => (
        <MovieCard key={m.id} movie={m} />
      ))}
    </ul>
  );
};

export default MoviePage;
