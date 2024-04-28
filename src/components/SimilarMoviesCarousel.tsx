import { SimilarFilm } from "../types.ts";
import { useState } from "react";
import SimilarMovieCard from "./SimilarMovieCard.tsx";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";


interface SimilarMoviesCarouselProps {
    movies: SimilarFilm[];
    length: number;
}

export default function SimilarMoviesCarousel({ movies, length }: SimilarMoviesCarouselProps) {
    const [ shift, setShift ] = useState<number>(0);

    if (!movies || movies.length === 0) return <h3 className="font-bold text-lg mt-6">Похожих фильмов не найдено</h3>

    return (
        <div className="w-full mt-6 relative overflow-x-hidden p-2">
            {shift > 0 && <button onClick={() => setShift(curShift => curShift - 1)}
                                  className="absolute left-3 hover:left-1.5 transition-all duration-300
                                   top-[50%] -translate-y-[50%] rounded-full bg-slate-300 shadow
                                  border dark:border-0 border-slate-700 dark:bg-slate-700 text-gray-800 dark:text-gray-200 text-xl p-2 group">
                <FaChevronLeft className="relative group-hover:bottom-[1px]"/></button>}
            <h3 className="text-xl font-bold mb-2">Похожие фильмы</h3>
            <div className="grid gap-x-3 grid-cols-[repeat(2,_minmax(150px,_1fr))] sm:grid-cols-[repeat(3,_minmax(150px,_1fr))] md:grid-cols-[repeat(4,_minmax(150px,_1fr))]">
                {movies.slice(shift, shift + length).map(film => (
                    <SimilarMovieCard key={film.id} film={film}/>
                ))}
            </div>
            {shift + length < movies.length &&
                <button onClick={() => setShift(curShift => curShift + 1)}
                        className="absolute right-3 hover:right-1.5 transition-all duration-300
                         top-[50%] -translate-y-[50%] rounded-full bg-slate-300 shadow
                        border  dark:border-0 border-slate-700 dark:bg-slate-700 text-gray-800 dark:text-gray-200 text-xl p-2 group">
                    <FaChevronRight className="relative group-hover:bottom-[1px]"/></button>}
        </div>
    )
}