import { Film } from "../types.ts";

export function getRatingColor(rating: number): string {
    if (+rating < 3) {
        return "bg-yellow-600";
    } else if (+rating < 5) {
        return "bg-amber-400";
    } else if (+rating < 7) {
        return "bg-lime-400";
    }
    return "bg-green-500";
}

export function formatRating(film: Film | undefined) {
    let r = (Math.round(((film?.rating.kp || film?.rating.imdb || 0) * 10)) / 10).toString();
    if (r.length === 1) {
        r += '.0';
    }
    return r;
}