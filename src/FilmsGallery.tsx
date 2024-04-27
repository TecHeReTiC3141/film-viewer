import { useQuery } from "@tanstack/react-query";
import { Film, FilmsResponse } from "./types.ts";
import FilmCard from "./components/FilmCard.tsx";
import PaginationBar from "./components/PaginationBar.tsx";
import { useSearchParams } from "react-router-dom";

export default function FilmsGallery() {

    const [searchParams, setSearchParams] = useSearchParams();

    const page = +(searchParams.get("page") || 1);

    const { data, isPending, isError }= useQuery<Film[]>({
        queryKey: [ "films", page ],
        queryFn: async () => {
            const response = await fetch(`https://api.kinopoisk.dev/v1.4/movie?page=${page}&limit=10`, {
                headers: {
                    "X-API-KEY": import.meta.env.VITE_KINOPOISK_API_KEY,
                }
            });
            const responseData: FilmsResponse = await response.json();
            return responseData.docs;
        }
    });

    if (isError) console.error("Error fetching films");
    // TODO: fix mobile layout
    return (
        <div className="container mx-auto pt-6">
            <h1 className="text-2xl font-bold mt-4">Лучшие фильмы</h1>
            <PaginationBar  currentPage={page} setSearchParams={setSearchParams}/>
            <div className="w-full grid grid-cols-1 md:grid-cols-[repeat(4,_minmax(140px,_1fr))] lg:grid-cols-[repeat(5,_minmax(150px,_1fr))] gap-y-8 gap-x-4 p-4">
                {isPending && <p>Loading...</p>}
                {isError && <p>Извините, не смогли загрузить фильмы. Попробуйте еще раз через некоторое время</p>}
                {!isPending && !isError && data && data.map((film: Film) => (
                    <FilmCard key={film.id} film={film}/>
                ))}
            </div>
        </div>
    )
}