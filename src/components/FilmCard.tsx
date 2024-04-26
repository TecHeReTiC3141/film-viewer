import { Film } from "../types.ts";
import { Link } from "react-router-dom";
import posterPlaceholder from "../../public/poster-placeholder.jpg";

interface FilmCardProps {
    film: Film,
}

export default function FilmCard({ film }: FilmCardProps) {
    console.log(film);
    return (
        <Link to={`/${film.id}`} className="flex flex-col cursor-pointer hover:bg-black bg-transparent
            transition-colors duration-300 rounded-xl p-2 shadow shadow-black hover:shadow-gray-200 text-gray-200 hover:text-white ">
            <img className="rounded-md object-cover min-h-[80%]" src={film.poster.previewUrl || film.poster.url || posterPlaceholder} alt={film.name}/>
            <div className="flex gap-2 py-2 ">
                <p className="text-4xl font-bold">{Math.round(((film.rating.kp || film.rating.imdb || 0) * 10)) / 10}</p>
                <div className="truncate">
                    <p className="max-sm:text-lg xl:text-lg">{film.name}</p>
                    <p className="text-xs">{film.year}</p>
                </div>
            </div>
        </Link>
    )
}