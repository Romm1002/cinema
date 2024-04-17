import IFilm from "./Film";

export default interface ISession { 
    id: number;
    film: IFilm; 
    date: Date; 
    time: string; 
    availableSeats: number;
    }