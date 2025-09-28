import type { Movie } from "../types/movies";

interface MovieCardProps {
    movie : Movie;
}

const MovieCard = ({movie} : MovieCardProps) => {

    return (
        <>
            <li key={movie.id}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="w-1.9 rounded-md hover:blur"/>
            </li> 
        </>
    )
}

export default MovieCard;