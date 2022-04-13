/**
 * Define la propiedad de la playlist
 */
export declare type Property = 'user' | 'system';
/**
 * Clase Género
 */
export declare class Genre {
    name: string;
    authors: string[];
    albums: string[];
    songs: string[];
    /**
     * Constructor
     * @param name Nombre del género
     * @param authors Autores del género
     * @param albums Albumes del género
     * @param songs Canciones del género
     */
    constructor(name: string, authors: string[], albums: string[], songs: string[]);
}
/**
 * Clase Album
 */
export declare class Album {
    name: string;
    author: string;
    yearPublication: number;
    genres: string[];
    songs: string[];
    /**
     * Constructor
     * @param name Nombre del album
     * @param author Autor del album
     * @param yearPublication Año de publicación
     * @param genres Géneros del album
     * @param songs Canciones del album
     */
    constructor(name: string, author: string, yearPublication: number, genres: string[], songs: string[]);
}
/**
 * Clase Canción
 */
export declare class Song {
    name: string;
    author: string;
    duration: number;
    genres: string[];
    single: boolean;
    numberReproductions: number;
    /**
     * Constructor
     * @param name Nombre de la canción
     * @param author Autor de la canción
     * @param duration Duración de la canción
     * @param genres Géneros de la canción
     * @param single Boleano que determina si la canción es un single
     * @param numberReproductions Número de reproducciones totales
     */
    constructor(name: string, author: string, duration: number, genres: string[], single: boolean, numberReproductions: number);
}
/**
 * Clase Abstracta Autor
 */
export declare abstract class Author {
    name: string;
    genres: string[];
    albums: string[];
    monthlyListeners: number;
    /**
     * Constructor
     * @param name Nombre del autor
     * @param genres Géneros del autor
     * @param albums Albumes del autor
     * @param monthlyListeners Oyentes mensuales
     */
    constructor(name: string, genres: string[], albums: string[], monthlyListeners: number);
}
/**
 * Clase Grupo
 */
export declare class Group extends Author {
    artists: string[];
    yearCreation: number;
    /**
     * Constructor
     * @param name Nombre del grupo
     * @param artists Artistas que pertencen al grupo
     * @param yearCreation Año de creación del grupo
     * @param genres Géneros del grupo
     * @param albums Albumes del grupo
     * @param monthlyListeners Oyentes mensuales
     */
    constructor(name: string, artists: string[], yearCreation: number, genres: string[], albums: string[], monthlyListeners: number);
}
/**
 * Clase Artista
 */
export declare class Artist extends Author {
    groups: string[];
    songs: string[];
    /**
     * Constructor
     * @param name Nombre del artista
     * @param groups Grupos a los que pertenece el artista
     * @param genres Géneros del artista
     * @param albums Albumes del artista
     * @param songs Canciones del artista
     * @param monthlyListeners Oyentes mensuales
     */
    constructor(name: string, groups: string[], genres: string[], albums: string[], songs: string[], monthlyListeners: number);
}
/**
 * Clase Playlist
 */
export declare class Playlist {
    name: string;
    songs: string[];
    duration: number;
    genres: string[];
    owner: Property;
    /**
     * Constructor
     * @param name Nombre de la playlist
     * @param songs Canciones de la playlist
     * @param duration Duración de la playlist en horas y minutos
     * @param genres Géneros de la playlist
     * @param owner Propietario de la playlist
     */
    constructor(name: string, songs: string[], duration: number, genres: string[], owner?: Property);
}
