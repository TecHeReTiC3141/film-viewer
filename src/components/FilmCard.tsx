import { Film } from "../types.ts";
import { Link } from "react-router-dom";
import posterPlaceholder from "../../public/poster-placeholder.jpg";
import { useMemo } from "react";

interface FilmCardProps {
    film: Film,
}

export default function FilmCard({ film }: FilmCardProps) {
    console.log(film);

    const rating = useMemo(() => {
        let r = (Math.round(((film.rating.kp || film.rating.imdb || 0) * 10)) / 10).toString();
        if (r.length === 1) {
            r += '.0';
        }
        return r;
    }, [film]);


    // TODO: when card is hovered, short extended film card (with short description and
    return (
        <Link to={`/${film.id}`} className="flex flex-col cursor-pointer dark:hover:bg-black hover:bg-gray-700 bg-transparent
            transition-colors duration-300 rounded-xl p-2 shadow shadow-black hover:shadow-gray-200
            dark:text-gray-200 dark:hover:text-white text-gray-800 hover:text-gray-200">
            <img className="rounded-md object-cover min-h-[80%]"
                 src={film.poster?.previewUrl || film.poster?.url || posterPlaceholder} alt={film.name}/>
            <div className="flex gap-2 py-2 ">
                <p className="text-4xl font-bold">{rating}</p>
                <div className="truncate">
                    <p className="max-sm:text-lg xl:text-lg">{film.name}</p>
                    <p className="text-xs">{film.year}</p>
                </div>
            </div>
        </Link>
    )
}