export type Film = {
    id: number;
    name: string;
    description: string;
    shortDescription: string | null;
    releaseDate: string;
    rating: { kp: number | null, imdb: number | null };
    poster: { url: string, previewUrl: string };
    similarMovies: SimilarFilm[];
    sequelsAndPrequels: SimilarFilm[];
    genres: { name: string }[];
    year: number;
    movieLength: number;
    premiere: { world: Date, russia: Date };
    votes: { kp: string | null, await: number | null }
    ratingMpaa: "pg13" | "g" | "r" | null;
}



export type SimilarFilm = {
    id: number;
    rating: number;
    year: number;
    name: string;
    type: string;
    poster: { url: string, previewUrl: string };
}

export type FilmsResponse = {
    docs: Film[];
    total: number;
    limit: number;
    page: number;
    pages: number;
}

