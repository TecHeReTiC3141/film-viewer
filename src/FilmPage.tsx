import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Film } from "./types.ts";
import { FaArrowLeft } from "react-icons/fa6";
import SimilarMoviesCarousel from "./components/SimilarMoviesCarousel.tsx";
import posterPlaceholder from "../public/poster-placeholder.jpg";


export default function FilmPage() {

    const { id } = useParams();

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

    if (isError) {
        return <p>Извините, не смогли загрузить этот фильм. Попробуйте еще раз через некоторое время</p>
    }

    if (isPending) {
        return <p>Loading...</p>
    }
    console.log(film.premiere);
    const date = film.premiere.russia || film.premiere.world ?
        new Date(film.premiere.russia || film.premiere.world).toLocaleDateString("ru-RU") : "Не указано";

    return (
        <div className="container mx-auto">
            <Link to="/"
                  className="flex items-center text-lg text-gray-200 hover:text-white gap-2 mt-2"><FaArrowLeft/> Назад</Link>
            <h1 className="text-4xl font-bold my-4">{Math.round(((film.rating.kp || film.rating.imdb || 0) * 10)) / 10} {film.name}</h1>
            <div className="flex flex-col xl:flex-row-reverse gap-4 px-4">
                <img src={film.poster.url || posterPlaceholder} className="w-full max-w-48 object-cover xl:max-w-[40%]"
                     alt={film.name}/>
                <div className="flex flex-col flex-1">
                    <div>

                        <p className="mb-6 text-lg">{film.description}</p>
                        <p><span
                            className="font-bold">Длительность:</span> {film.movieLength ? (`${film.movieLength} мин`) : "Не указано"}
                        </p>
                        <p><span
                            className="font-bold">Популярность:</span> {film.votes.kp || film.votes.await || "Не указано"}
                        </p>
                        <p><span
                            className="font-bold">Дата выхода:</span> {date}
                        </p>
                        <p><span className="font-bold">Жанр:</span> {film.genres.map(genre => genre.name).join(", ")}
                        </p>
                    </div>
                    <SimilarMoviesCarousel movies={(film.similarMovies || []).concat(film.sequelsAndPrequels || [])}/>
                </div>
            </div>
        </div>
    )
}