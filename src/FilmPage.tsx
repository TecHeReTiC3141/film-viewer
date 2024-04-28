import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Film } from "./types.ts";
import { FaArrowLeft } from "react-icons/fa6";
import SimilarMoviesCarousel from "./components/SimilarMoviesCarousel.tsx";
import posterPlaceholder from "../public/poster-placeholder.jpg";
import { useCallback, useEffect, useMemo, useState } from "react";
import Loading from "./components/Loading.tsx";
import { formatRating, getRatingColor } from "./utils/rating.ts";
import clsx from "clsx";


export default function FilmPage() {

    const { id } = useParams();

    console.log(id, !Number.isInteger(+id!));

    if (!Number.isInteger(+id!) || (+id!) <= 0) {
        throw new Error("Not found");
    }

    const { data: film, isError, isPending } = useQuery<Film>({
        queryKey: [ "film", id ],
        queryFn: async () => {
            const response = await fetch(`https://api.kinopoisk.dev/v1.4/movie/${id}`, {
                    headers: {
                        "X-API-KEY": import.meta.env.VITE_KINOPOISK_API_KEY,
                        "Content-Type": "application/json",
                    }
                }
            );
            return response.json();
        }
    });

    const rating = useMemo(() => formatRating(film), [ film ]);

    const ratingColor = useMemo(() => getRatingColor(+rating), [ rating ]);


    const [ carouselLength, setCarouselLength ] = useState(Math.min(4, Math.floor(window.innerWidth / 180)));


    const determineCarouseLength = useCallback(() => {
        if (window.innerWidth < 640) {
            setCarouselLength(2);
        } else if (window.innerWidth < 768) {
            setCarouselLength(3);
        } else {
            setCarouselLength(4);
        }
    }, []);


    useEffect(() => {
        determineCarouseLength();
        window.addEventListener("resize", () => {
            determineCarouseLength();
        })
    }, [ determineCarouseLength ]);

    if (isError) {
        return <p>Извините, не смогли загрузить этот фильм. Попробуйте еще раз через некоторое время</p>
    }

    if (isPending) {
        return <Loading text="фильм"/>;
    }
    const date = film.premiere.russia || film.premiere.world ?
        new Date(film.premiere.russia || film.premiere.world).toLocaleDateString("ru-RU") : "Не указано";

    return (
        <div className="container mx-auto">
            <Link to="/"
                  className="flex items-center text-lg text-gray-600 dark:text-gray-200 hover:font-semibold
                  hover:text-gray-800 dark:hover:text-white gap-2 mt-2 relative hover:right-2"><FaArrowLeft/> Назад</Link>
            <h1 className="text-4xl max-lg:text-center font-bold my-4">
                <span className={clsx("px-4 rounded-xl", ratingColor)}>{rating}</span> {film.name}
            </h1>
            <div className="hidden lg:flex flex-col lg:flex-row-reverse gap-4 px-4 ">
                <img src={film.poster.url || posterPlaceholder} className="w-full object-cover max-w-[35%] rounded-md"
                     alt={film.name}/>
                <div className="flex flex-col flex-1">
                    <div>

                        <p className="mb-6 md:text-lg">{film.description}</p>
                        <p><span
                            className="font-bold">Длительность:</span> {film.movieLength ? (`${film.movieLength} мин`) : "Не указано"}
                        </p>
                        <p><span
                            className="font-bold">Популярность:</span> {film.votes.kp || film.votes.await || "Не указано"}
                        </p>
                        <p><span
                            className="font-bold">Дата выхода:</span> {date}
                        </p>
                        <p><span
                            className="font-bold text-wrap">Жанр:</span> {film.genres.map(genre => genre.name).join(", ")}
                        </p>
                    </div>
                    <SimilarMoviesCarousel movies={(film.similarMovies || []).concat(film.sequelsAndPrequels || [])}
                                           length={carouselLength}/>
                </div>
            </div>
            <div className="w-full lg:hidden  px-4 ">
                <div className="flex max-sm:justify-center flex-wrap gap-8 mx-auto">

                    <img src={film.poster.url || posterPlaceholder} className="w-full max-w-48 object-cover rounded"
                         alt={film.name}/>
                    <div className="flex flex-col gap-3 mt-4">

                        <p><span
                            className="font-bold">Длительность:</span> {film.movieLength ? (`${film.movieLength} мин`) : "Не указано"}
                        </p>
                        <p><span
                            className="font-bold">Популярность:</span> {film.votes.kp || film.votes.await || "Не указано"}
                        </p>
                        <p><span
                            className="font-bold">Дата выхода:</span> {date}
                        </p>
                        <p><span
                            className="font-bold text-wrap">Жанр:</span> {film.genres.map(genre => genre.name).join(", ")}
                        </p>
                    </div>
                </div>
                <p className="my-6 md:text-lg">{film.description}</p>
                <SimilarMoviesCarousel movies={(film.similarMovies || []).concat(film.sequelsAndPrequels || [])}
                                       length={carouselLength}/>
            </div>
        </div>
    )
}