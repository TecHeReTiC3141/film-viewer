import { useQuery } from "@tanstack/react-query";
import { Film, FilmsResponse } from "./types.ts";
import FilmCard from "./components/FilmCard.tsx";
import PaginationBar from "./components/PaginationBar.tsx";
import { useSearchParams } from "react-router-dom";
import Loading from "./components/Loading.tsx";

export default function FilmsGallery() {

    const [ searchParams, setSearchParams ] = useSearchParams();

    const page = +(searchParams.get("page") || 1);

    const { data, isPending, isError } = useQuery<Film[]>({
        queryKey: [ "films", page ],
        queryFn: async () => {
            const response = await fetch(`https://api.kinopoisk.dev/v1.4/movie?page=${page}&limit=15`, {
                headers: {
                    "X-API-KEY": import.meta.env.VITE_KINOPOISK_API_KEY,
                }
            });
            const responseData: FilmsResponse = await response.json();
            return responseData.docs;
        }
    });

    if (isError) {
        console.error("Error fetching films");
        throw new Error("Извините, мы не смогли загрузить фильмы. Попробуйте еще раз через некоторое время");
    }

    if (isPending) {
        return <Loading text="Фильмы" />;
    }

    // TODO: on big screen add buttons (chevrons) leading to next/previous page
    return (
        <div className="container mx-auto pt-6">
            <h1 className="text-2xl font-bold mt-4 max-md:text-center">Лучшие фильмы</h1>
            <PaginationBar currentPage={page} setSearchParams={setSearchParams}/>
            <div className="w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-[repeat(4,_minmax(140px,_1fr))]
                            lg:grid-cols-[repeat(5,_minmax(150px,_1fr))] gap-y-8 gap-x-4 p-4">
                {data.map((film: Film) => (
                    <FilmCard key={film.id} film={film}/>
                ))}
            </div>
        </div>
    )
}