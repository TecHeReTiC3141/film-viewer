import { Film } from "../types.ts";
import posterPlaceholder from "../../public/poster-placeholder.jpg";
import clsx from "clsx";
import { RefObject, useMemo, useState } from "react";
import { formatRating, getRatingColor } from "../utils/rating.ts";

interface ExtendedFilmCardProps {
    film: Film;
    cardRef: RefObject<HTMLAnchorElement>;
}

export default function ExtendedFilmCard({ film, cardRef }: ExtendedFilmCardProps) {
    const rating = useMemo(() => formatRating(film), [ film ]);

    const [ showDescription, setShowDescription ] = useState<boolean>(false);

    const MAX_SHORT_DESCRIPTION_LENGTH = 100;

    const shortDescription = useMemo(() => {
        const description = film.shortDescription || film.description || "Не указано";
        if (description.length <= MAX_SHORT_DESCRIPTION_LENGTH) return description;
        return description.slice(0, MAX_SHORT_DESCRIPTION_LENGTH) + "...";
    }, [ film ]);

    const ratingMapper = {
        g: "6+",
        pg13: "12+",
        r: "18+",
    };

    const ratingColor = useMemo(() => getRatingColor(+rating), [ rating ]);
    return (
        <div onMouseLeave={() => setTimeout(() => {
            cardRef?.current?.classList.remove("is-hovered");
        }, 750)}
             className="hidden md:group-[.is-hovered]:block absolute -top-2 md:-left-[40%] lg:-left-[25%] xl:-left-[13%]
              md:w-[180%] lg:w-[150%] xl:w-[125%] h-[110%] rounded-xl bg-gray-400 dark:bg-gray-800
        shadow shadow-black hover:shadow-gray-200 z-20">
            {showDescription ? <div className="p-2">{film.description}</div> :
                <>
                    <div className="w-full h-[60%] overflow-y-hidden relative">
                        <img className="rounded-md object-cover w-full"
                             src={film.poster?.previewUrl || film.poster?.url || posterPlaceholder} alt={film.name}/>
                        <div className={clsx("py-1 px-2  absolute bottom-0 left-0  w-full bg-gray-600 bg-opacity-70")}>
                            <h3 className="font-bold text-xl text-white">{film.name}</h3>
                            <div className="flex items-center gap-x-2 ">
                                <span className={clsx("px-2 rounded-lg", ratingColor)}>{rating}</span>
                                <span className="text-gray-300 text-sm">
                            {film.year}, {film.genres.slice(0, 2).map(genre => genre.name).join(", ")} - {film.ratingMpaa ? ratingMapper[ film.ratingMpaa ] : "0+"}
                        </span>
                            </div>
                        </div>
                    </div>
                    <div className="truncate text-wrap px-3 max-h-[25%]">{shortDescription}
                        <button onClick={event => {
                            event.preventDefault();
                            setShowDescription(true);
                        }} className="ml-1 hover:text-gray-300 text-gray-400 text-sm">Читать далее</button>
                    </div>
                </>
            }
        </div>
    )
}