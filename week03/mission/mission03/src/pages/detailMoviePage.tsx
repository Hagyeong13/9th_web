import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Credit, Credits } from "../types/credit";
import ErrorPage from "./errorPage";
import CreditCard from "../components/CreditCard";
import type { Movie } from "../types/movies";

const DetailMovie = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const [credits,setCredits]=useState<Credit[]>([]);
    const [movie, setMovie] = useState<Movie>();
    const [isLoading,setIsloading] =useState(true);
    const [isError,setIserror]=useState(false);
    const id = movieId?.trim();
    useEffect(() => {
        const loadCredits = async () => {
            setIsloading(true);
            try {
                const { data } = await axios.get<Credits>(
                    `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        },
                    }
                );

                setCredits(data.cast);
            } catch (error) {
                setIserror(true);
            }

            try{
                const { data } = await axios.get<Movie>(
                    `https://api.themoviedb.org/3/movie/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        },
                    }
                );

                setMovie(data);
                setIsloading(false);
                setIserror(false);
            } catch(error) {
                setIserror(true);
            }
        };

        loadCredits();
    }, [id]);

    return (
        <>
            {isError &&(<ErrorPage />)}

            {!isLoading && (
                <div>
                    <h1>{movie?.title}</h1>
                    <ul className="container mx-auto px-16 py-4 grid grid-cols-6 gap-2">
                        {credits.map((m) => (
                            <CreditCard key={m.id} credit={m}/>
                        ))}
                    </ul>
                </div>
            )}
            
            {isLoading && (
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black-500"></div>
                </div>
            )}
        </>
    )
}

export default DetailMovie;