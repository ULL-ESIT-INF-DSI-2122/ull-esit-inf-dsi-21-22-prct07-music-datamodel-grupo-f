/**
 * Define la propiedad de la playlist
 */
export type Property = 'user' | 'system'; 

/**
 * Clase Género
 */
export class Genre {
    /**
     * Constructor
     * @param name Nombre del género
     * @param authors Autores del género
     * @param albums Albumes del género
     * @param songs Canciones del género
     */
    constructor(public name: string, public authors: string[], public albums: string[], public songs: string[]) {}
}

/**
 * Clase Album
 */
export class Album {
    /**
     * Constructor
     * @param name Nombre del album
     * @param author Autor del album
     * @param yearPublication Año de publicación
     * @param genres Géneros del album
     * @param songs Canciones del album
     */
    constructor(public name: string, public author: string, public yearPublication: number, public genres: string[], public songs: string[]) {}
}

/**
 * Clase Canción
 */
export class Song {
    /**
     * Constructor
     * @param name Nombre de la canción
     * @param author Autor de la canción
     * @param duration Duración de la canción
     * @param genres Géneros de la canción
     * @param single Boleano que determina si la canción es un single
     * @param numberReproductions Número de reproducciones totales
     */
    constructor(public name: string, public author: string, public duration: number, public genres: string[], public single: boolean, public numberReproductions: number) {}
}

/**
 * Clase Abstracta Autor
 */
export abstract class Author {
    /**
     * Constructor
     * @param name Nombre del autor
     * @param genres Géneros del autor
     * @param albums Albumes del autor
     * @param monthlyListeners Oyentes mensuales
     */
    constructor(public name: string, public genres: string[], public albums: string[], public monthlyListeners: number) {}
}

/**
 * Clase Grupo
 */
export class Group extends Author {
    /**
     * Constructor
     * @param name Nombre del grupo
     * @param artists Artistas que pertencen al grupo
     * @param yearCreation Año de creación del grupo
     * @param genres Géneros del grupo
     * @param albums Albumes del grupo
     * @param monthlyListeners Oyentes mensuales
     */
    constructor(name: string, public artists: string[], public yearCreation: number, genres: string[], albums: string[], monthlyListeners: number) {
        super(name, genres, albums, monthlyListeners);
    }
}

/**
 * Clase Artista
 */
export class Artist extends Author {
    /**
     * Constructor
     * @param name Nombre del artista 
     * @param groups Grupos a los que pertenece el artista
     * @param genres Géneros del artista
     * @param albums Albumes del artista
     * @param songs Canciones del artista
     * @param monthlyListeners Oyentes mensuales
     */
    constructor(name: string, public groups: string[], genres: string[], albums: string[], public songs: string[], monthlyListeners: number) {
        super(name, genres, albums, monthlyListeners);
    }
}

/**
 * Clase Playlist
 */
export class Playlist {
    /**
     * Constructor
     * @param name Nombre de la playlist
     * @param songs Canciones de la playlist
     * @param duration Duración de la playlist en horas y minutos
     * @param genres Géneros de la playlist
     * @param owner Propietario de la playlist
     */
    constructor(public name: string, public songs: string[], public duration: number, public genres: string[], public owner: Property = 'system') {}
}