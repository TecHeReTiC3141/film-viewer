import { SimilarFilm } from "../types.ts";
import { Link } from "react-router-dom";
import posterPlaceholder from "../../public/poster-placeholder.jpg";

interface SimilarMovieCardProps {
    film: SimilarFilm;
}

export default function SimilarMovieCard({film}: SimilarMovieCardProps) {
    return (
        <Link to={`/${film.id}`} className="flex flex-col cursor-pointer hover:bg-gray-700 dark:hover:bg-black bg-transparent
            transition-colors duration-300 rounded-xl p-2 shadow shadow-black hover:shadow-gray-200
            dark:text-gray-200 dark:hover:text-white text-gray-800 hover:text-gray-200">
            <img className="rounded-md object-cover min-h-[80%]" src={film.poster.previewUrl || film.poster.url || posterPlaceholder} alt={film.name}/>
            <p className="truncate text-sm mt-2">{film.name}</p>
        </Link>
    )
}