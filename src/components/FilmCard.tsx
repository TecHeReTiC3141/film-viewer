import { Film } from "../types.ts";
import { Link } from "react-router-dom";
import posterPlaceholder from "../../public/poster-placeholder.jpg";
import { useMemo } from "react";
import clsx from "clsx";
import { formatRating, getRatingColor } from "../utils/rating.ts";

interface FilmCardProps {
    film: Film,
}

export default function FilmCard({ film }: FilmCardProps) {
    console.log(film);

    const rating = useMemo(() => formatRating(film), [ film ]);

    const ratingColor = useMemo(() => getRatingColor(+rating), [rating]);

    // TODO: when card is hovered, short extended film card (with short description and
    return (
        <Link to={`/${film.id}`} className="flex flex-col cursor-pointer dark:hover:bg-black hover:bg-gray-700 bg-transparent
            transition-colors duration-300 rounded-xl p-2 shadow shadow-black hover:shadow-gray-200
            dark:text-gray-200 dark:hover:text-white text-gray-800 hover:text-gray-200">
            <div className="min-h-[80%] relative">

                <img className="rounded-md object-cover h-full"
                     src={film.poster?.previewUrl || film.poster?.url || posterPlaceholder} alt={film.name}/>
                <div className={clsx("px-2 rounded-lg absolute bottom-2 left-2 font-bold", ratingColor)}>{rating}</div>
            </div>
            <div className="flex gap-2 py-2 ">
                {/*<p className="text-4xl font-bold">{rating}</p>*/}
                <div className="truncate">
                    <p className="max-sm:text-lg md:text-lg">{film.name}</p>
                    <p className="text-xs">{film.year}</p>
                </div>
            </div>
        </Link>
    )
}