import { useQuery } from "@tanstack/react-query";
import { Film, FilmsResponse } from "./types.ts";

export default function FilmsGallery() {

    const { data, isPending, isError }: { data: Film[] | undefined, isPending: boolean, isError: boolean } = useQuery({
        queryKey: [ "films" ],
        queryFn: async () => {
            const response = await fetch(`https://api.kinopoisk.dev/v1.4/movie?page=1&limit=10`, {
                headers: {
                    "X-API-KEY": import.meta.env.VITE_KINOPOISK_API_KEY,
                }
            });
            const responseData: FilmsResponse = await response.json();
            return responseData.docs;
        }
    })
    return (
        <>
            <h1 className="text-2xl text-center mt-4">Films page</h1>
            {JSON.stringify(data, null, 2)}
            {}
        </>
    )
}