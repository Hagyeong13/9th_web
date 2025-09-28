import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import type { Movie, Movies } from "../types/movies";
import axios from "axios";
import MovieCard from "../components/MovieCard";

const MoviePage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const location = useLocation();
    const [isLoading,setIsloading] =useState(true);

    useEffect(() => {
        const loadMovies = async () => {
            let endpoint = "popular";
            if (location.pathname === "/playing") endpoint = "now_playing";
            else if (location.pathname === "/top_rated") endpoint = "top_rated";
            else if (location.pathname === "/upcoming") endpoint = "upcoming";

            setIsloading(true);
            const { data } = await axios.get<Movies>(
                `https://api.themoviedb.org/3/movie/${endpoint}?language=en-US&page=1`,
                {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                    },
                }
            );

            setMovies(data.results);
            setIsloading(false);
        };

        loadMovies();
    }, [location.pathname]);

    return (
        <>
            {!isLoading && (
                <ul className="container mx-auto px-16 py-4 grid grid-cols-6 gap-2">
                    {movies.map((m) => (
                        <MovieCard key={m.id} movie={m} />
                    ))}
                </ul>
            )}
            {isLoading && (
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black-500"></div>
                </div>
            )}
        </>
    );
};

export default MoviePage;
