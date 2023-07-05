
import { Scenes } from "telegraf";

export type FilmT = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
export type FilmsDataT = {
    page: number,
    results: FilmT[],
    total_pages: number,
    total_results: number
}

interface MySceneSession extends Scenes.SceneSessionData  {
	allFilms: FilmT[];
    currentFilm: number
}



export type MyContextBasicSceneT = Scenes.SceneContext<MySceneSession>;


