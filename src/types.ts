export type Film = {
    id: number;
    title: string;
    description: string;
    releaseDate: string;
    rating: { kp: number | null, imdb: number | null};
    poster: string;
    similarMovies: Film[];
    genres: string[];
}

export type SimilarFilm = {
    id: number;
    rating: number;
    year: number;
    name: string;
    type: string;
    poster: string;
}

export type FilmsResponse = {
    docs: Film[];
    total: number;
    limit: number;
    page: number;
    pages: number;
}