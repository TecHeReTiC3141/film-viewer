import { Film } from "../types.ts";
import posterPlaceholder from "../../public/poster-placeholder.jpg";
import logo from "../../public/film-viewer-icon.png";
import clsx from "clsx";
import { RefObject, useMemo, useState } from "react";
import { formatRating, getRatingColor } from "../utils/rating.ts";
import { FaArrowLeftLong, FaBookmark, FaEye, FaRegBookmark, FaRegEye, FaXmark } from "react-icons/fa6";
import ExtendedFilmCardButton, { ExtendedFilmCardButtonProps } from "./ExtendedFilmCardButton.tsx";


interface ExtendedFilmCardProps {
    film: Film;
    cardRef: RefObject<HTMLAnchorElement>;
}

const buttons: ExtendedFilmCardButtonProps[] = [
    {
        TurnedOffIcon: FaRegBookmark,
        TurnedOnIcon: FaBookmark,
        text: "Посмотрю",
    },
    {
        TurnedOffIcon: FaXmark,
        TurnedOnIcon: FaXmark,
        text: "Неинтересно",
    },
    {
        TurnedOffIcon: FaRegEye,
        TurnedOnIcon: FaEye,
        text: "Просмотрено",
    },
]

export default function ExtendedFilmCard({ film, cardRef }: ExtendedFilmCardProps) {
    const rating = useMemo(() => formatRating(film), [ film ]);

    const [ showDescription, setShowDescription ] = useState<boolean>(false);

    const MAX_SHORT_DESCRIPTION_LENGTH = 80;

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
            setShowDescription(false);
            cardRef?.current?.classList.remove("is-hovered");
        }, 750)}
             className="hidden md:group-[.is-hovered]:block absolute -top-2 md:-left-[40%] lg:-left-[25%] xl:-left-[13%]
              md:w-[180%] lg:w-[150%] xl:w-[125%] md:h-[140%] lg:h-[130%] xl:h-[110%] rounded-xl bg-gray-600 dark:bg-gray-800
        shadow shadow-black hover:shadow-gray-600 dark:hover:shadow-gray-200 z-20">
            {showDescription ?
                <div className="p-2 text-sm h-full truncate text-wrap">
                    <div className="w-full flex items-center justify-between border-b border-gray-100 mb-2 py-2 px-1">
                        <button
                            className="text-xl text-white hover:text-gray-300 dark:text-gray-500 hover:dark:text-gray-200 transition-colors duration-200"
                            onClick={event => {
                                event.preventDefault();
                                setShowDescription(false);
                            }}><FaArrowLeftLong/></button>
                        <h4 className="font-bold text-white">{film.name}
                        </h4>
                        <div/>
                    </div>
                    {film.description}
                </div>
                :
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
                    <div className="truncate text-wrap px-3">{shortDescription}
                        <button onClick={event => {
                            event.preventDefault();
                            setShowDescription(true);
                        }} className="ml-1 hover:text-gray-300 text-gray-400 text-sm">Читать далее
                        </button>
                    </div>
                    <div className="w-full px-2">
                        <button onClick={event => event.preventDefault()}
                                className="hidden 2xl:flex w-full rounded-lg gap-x-2 justify-center items-center
                            py-2 my-2 bg-gray-400 hover:bg-gray-500 dark:bg-gray-700 hover:dark:bg-gray-500 transition-colors duration-200">
                            <img src={logo} alt="Смотреть филь" className="w-6"/> Смотреть фильм
                        </button>
                    </div>
                    <div className="flex justify-between items-center w-full py-2 px-1 gap-x-1 overflow-hidden">
                        {buttons.map(button => <ExtendedFilmCardButton key={button.text} {...button}/>)}
                    </div>
                </>
            }
        </div>
    )
}