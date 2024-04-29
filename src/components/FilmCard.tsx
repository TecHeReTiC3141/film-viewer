import { Film } from "../types.ts";
import { Link } from "react-router-dom";
import posterPlaceholder from "../../public/poster-placeholder.jpg";
import { useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { formatRating, getRatingColor } from "../utils/rating.ts";
import ExtendedFilmCard from "./ExtendedFilmCard.tsx";

interface FilmCardProps {
    film: Film;
}

export default function FilmCard({ film }: FilmCardProps) {

    const [ extendedTimerId, setExtendedTimerId ] = useState<number>(0);

    const cardRef = useRef<HTMLAnchorElement>(null);

    const rating = useMemo(() => formatRating(film), [ film ]);

    const ratingColor = useMemo(() => getRatingColor(+rating), [ rating ]);

    return (
        <Link ref={cardRef} to={`/${film.id}`}
              onMouseEnter={() => {
                  setExtendedTimerId(setTimeout(() => {
                      cardRef?.current?.classList.add("is-hovered");
                  }, 1000));
              }
              }
              onMouseLeave={() => setTimeout(() => {
                  clearTimeout(extendedTimerId);
                  cardRef?.current?.classList.remove("is-hovered");
              }, 250)}
              className="flex flex-col cursor-pointer dark:hover:bg-black hover:bg-gray-700 bg-transparent
            transition-colors duration-300 rounded-xl p-2 shadow shadow-black hover:shadow-gray-200
            dark:text-gray-200 dark:hover:text-white text-gray-800 hover:text-gray-200 relative group">

            <div className="min-h-[80%] max-h-[100%] max-sm:max-h-60 max-xs:max-h-56 relative">

                <img className="rounded-md object-cover h-full"
                     src={film.poster?.previewUrl || film.poster?.url || posterPlaceholder} alt={film.name}/>
                <div className={clsx("px-2 rounded-lg absolute bottom-2 left-2 font-bold", ratingColor)}>{rating}</div>
            </div>
            <div className="flex gap-2 py-2 ">
                {/*<p className="text-4xl font-bold">{rating}</p>*/}
                <div className="truncate">
                    <p className="md:text-lg">{film.name}</p>
                    <p className="text-xs">{film.year}</p>
                </div>
            </div>
            <ExtendedFilmCard film={film} cardRef={cardRef}/>
        </Link>
    )
}