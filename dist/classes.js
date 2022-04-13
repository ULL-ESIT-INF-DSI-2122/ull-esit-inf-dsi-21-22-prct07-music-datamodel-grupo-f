"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Playlist = exports.Artist = exports.Group = exports.Author = exports.Song = exports.Album = exports.Genre = void 0;
/**
 * Clase Género
 */
class Genre {
    /**
     * Constructor
     * @param name Nombre del género
     * @param authors Autores del género
     * @param albums Albumes del género
     * @param songs Canciones del género
     */
    constructor(name, authors, albums, songs) {
        this.name = name;
        this.authors = authors;
        this.albums = albums;
        this.songs = songs;
    }
}
exports.Genre = Genre;
/**
 * Clase Album
 */
class Album {
    /**
     * Constructor
     * @param name Nombre del album
     * @param author Autor del album
     * @param yearPublication Año de publicación
     * @param genres Géneros del album
     * @param songs Canciones del album
     */
    constructor(name, author, yearPublication, genres, songs) {
        this.name = name;
        this.author = author;
        this.yearPublication = yearPublication;
        this.genres = genres;
        this.songs = songs;
    }
}
exports.Album = Album;
/**
 * Clase Canción
 */
class Song {
    /**
     * Constructor
     * @param name Nombre de la canción
     * @param author Autor de la canción
     * @param duration Duración de la canción
     * @param genres Géneros de la canción
     * @param single Boleano que determina si la canción es un single
     * @param numberReproductions Número de reproducciones totales
     */
    constructor(name, author, duration, genres, single, numberReproductions) {
        this.name = name;
        this.author = author;
        this.duration = duration;
        this.genres = genres;
        this.single = single;
        this.numberReproductions = numberReproductions;
    }
}
exports.Song = Song;
/**
 * Clase Abstracta Autor
 */
class Author {
    /**
     * Constructor
     * @param name Nombre del autor
     * @param genres Géneros del autor
     * @param albums Albumes del autor
     * @param monthlyListeners Oyentes mensuales
     */
    constructor(name, genres, albums, monthlyListeners) {
        this.name = name;
        this.genres = genres;
        this.albums = albums;
        this.monthlyListeners = monthlyListeners;
    }
}
exports.Author = Author;
/**
 * Clase Grupo
 */
class Group extends Author {
    /**
     * Constructor
     * @param name Nombre del grupo
     * @param artists Artistas que pertencen al grupo
     * @param yearCreation Año de creación del grupo
     * @param genres Géneros del grupo
     * @param albums Albumes del grupo
     * @param monthlyListeners Oyentes mensuales
     */
    constructor(name, artists, yearCreation, genres, albums, monthlyListeners) {
        super(name, genres, albums, monthlyListeners);
        this.artists = artists;
        this.yearCreation = yearCreation;
    }
}
exports.Group = Group;
/**
 * Clase Artista
 */
class Artist extends Author {
    /**
     * Constructor
     * @param name Nombre del artista
     * @param groups Grupos a los que pertenece el artista
     * @param genres Géneros del artista
     * @param albums Albumes del artista
     * @param songs Canciones del artista
     * @param monthlyListeners Oyentes mensuales
     */
    constructor(name, groups, genres, albums, songs, monthlyListeners) {
        super(name, genres, albums, monthlyListeners);
        this.groups = groups;
        this.songs = songs;
    }
}
exports.Artist = Artist;
/**
 * Clase Playlist
 */
class Playlist {
    /**
     * Constructor
     * @param name Nombre de la playlist
     * @param songs Canciones de la playlist
     * @param duration Duración de la playlist en horas y minutos
     * @param genres Géneros de la playlist
     * @param owner Propietario de la playlist
     */
    constructor(name, songs, duration, genres, owner = 'system') {
        this.name = name;
        this.songs = songs;
        this.duration = duration;
        this.genres = genres;
        this.owner = owner;
    }
}
exports.Playlist = Playlist;
//# sourceMappingURL=classes.js.map