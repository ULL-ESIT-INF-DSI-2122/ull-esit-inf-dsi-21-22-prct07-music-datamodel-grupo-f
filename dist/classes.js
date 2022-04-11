"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Playlist = exports.Artist = exports.Group = exports.Author = exports.Song = exports.Album = exports.Genre = void 0;
class Genre {
    constructor(name, authors, albums, songs) {
        this.name = name;
        this.authors = authors;
        this.albums = albums;
        this.songs = songs;
    }
}
exports.Genre = Genre;
class Album {
    constructor(name, author, yearPublication, genres, songs) {
        this.name = name;
        this.author = author;
        this.yearPublication = yearPublication;
        this.genres = genres;
        this.songs = songs;
    }
}
exports.Album = Album;
class Song {
    constructor(name, author, duration = 0, genres, single, numberReproductions) {
        this.name = name;
        this.author = author;
        this.duration = duration;
        this.genres = genres;
        this.single = single;
        this.numberReproductions = numberReproductions;
    }
}
exports.Song = Song;
class Author {
    constructor(name, genres, albums, monthlyListeners) {
        this.name = name;
        this.genres = genres;
        this.albums = albums;
        this.monthlyListeners = monthlyListeners;
    }
}
exports.Author = Author;
class Group extends Author {
    constructor(name, artists, yearCreation, genres, albums, monthlyListeners) {
        super(name, genres, albums, monthlyListeners);
        this.artists = artists;
        this.yearCreation = yearCreation;
    }
}
exports.Group = Group;
class Artist extends Author {
    constructor(name, groups, genres, albums, songs, monthlyListeners) {
        super(name, genres, albums, monthlyListeners);
        this.groups = groups;
        this.songs = songs;
    }
}
exports.Artist = Artist;
class Playlist {
    constructor(name, songs, duration = 0, genres) {
        this.name = name;
        this.songs = songs;
        this.duration = duration;
        this.genres = genres;
    }
    setDuration(duration) {
        this.duration = duration;
    }
}
exports.Playlist = Playlist;
//# sourceMappingURL=classes.js.map