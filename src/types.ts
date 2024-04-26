export type Film = {
    id: number;
    name: string;
    description: string;
    releaseDate: string;
    rating: { kp: number | null, imdb: number | null};
    poster: { url: string, previewUrl: string };
    similarMovies: Film[];
    genres: string[];
    year: number;
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