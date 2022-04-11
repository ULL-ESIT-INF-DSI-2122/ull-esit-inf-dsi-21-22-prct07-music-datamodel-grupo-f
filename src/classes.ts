export class Genre {
    constructor(public name: string, public authors: string[], public albums: string[], public songs: string[]) {}
}

export class Album {
    constructor(public name: string, public author: string, public yearPublication: number, public genres: string[], public songs: string[]) {}
}

export class Song {
    constructor(public name: string, public author: string, public duration: number = 0, public genres: string[], public single: boolean, public numberReproductions: number) {}
}

export abstract class Author {
    constructor(public name: string, public genres: string[], public albums: string[], public monthlyListeners: number) {}
}

export class Group extends Author {
    constructor(name: string, public artists: string[], public yearCreation: number, genres: string[], albums: string[], monthlyListeners: number) {
        super(name, genres, albums, monthlyListeners);
    }
}

export class Artist extends Author {
    constructor(name: string, public groups: string[], genres: string[], albums: string[], public songs: string[], monthlyListeners: number) {
        super(name, genres, albums, monthlyListeners);
    }
}

export class Playlist {
    constructor(public name: string, public songs: string[], public duration: number = 0, public genres: string[]) {}

    setDuration(duration: number) {
        this.duration = duration;
    }
}