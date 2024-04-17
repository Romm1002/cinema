import IDirector from "./Realisateur";

export default interface IFilm { 
    id: string;
    title: string; 
    releaseYear: number; 
    genre: string; 
    directors: IDirector[];
    }