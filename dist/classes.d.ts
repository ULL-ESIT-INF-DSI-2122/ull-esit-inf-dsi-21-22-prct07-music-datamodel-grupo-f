export declare class Genre {
    name: string;
    authors: string[];
    albums: string[];
    songs: string[];
    constructor(name: string, authors: string[], albums: string[], songs: string[]);
}
export declare class Album {
    name: string;
    author: string;
    yearPublication: number;
    genres: string[];
    songs: string[];
    constructor(name: string, author: string, yearPublication: number, genres: string[], songs: string[]);
}
export declare class Song {
    name: string;
    author: string;
    duration: number;
    genres: string[];
    single: boolean;
    numberReproductions: number;
    constructor(name: string, author: string, duration: number, genres: string[], single: boolean, numberReproductions: number);
}
export declare abstract class Author {
    name: string;
    genres: string[];
    albums: string[];
    monthlyListeners: number;
    constructor(name: string, genres: string[], albums: string[], monthlyListeners: number);
}
export declare class Group extends Author {
    artists: string[];
    yearCreation: number;
    constructor(name: string, artists: string[], yearCreation: number, genres: string[], albums: string[], monthlyListeners: number);
}
export declare class Artist extends Author {
    groups: string[];
    songs: string[];
    constructor(name: string, groups: string[], genres: string[], albums: string[], songs: string[], monthlyListeners: number);
}
export declare class Playlist {
    name: string;
    songs: string[];
    duration: number;
    genres: string[];
    constructor(name: string, songs: string[], duration: number, genres: string[]);
    setDuration(duration: number): void;
}
