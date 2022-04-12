import { Genre, Album, Song, Artist, Group, Playlist } from './classes';
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

interface Schema {
    genres: Genre[],
    albums: Album[],
    songs: Song[],
    artists: Artist[],
    groups: Group[],
    playlists: Playlist[],
};

export class DataBase {
    private db: lowdb.LowdbSync<Schema>;

    constructor() {
        const adapter = new FileSync<Schema>("db.json");
        this.db = lowdb(adapter);
        this.initGenres();
        this.initAlbums();
        this.initSongs();
        this.initArtists();
        this.initGroups();
        this.initPlaylists();
    }

    private initGenres() {
        if(!this.db.has("genres").value()) {
            this.db.set("genres", []).write();
        }
    }

    private initAlbums() {
        if(!this.db.has("albums").value()) {
            this.db.set("albums", []).write();
        }
    }

    private initSongs() {
        if(!this.db.has("songs").value()) {
            this.db.set("songs", []).write();
        }
    }

    private initArtists() {
        if(!this.db.has("artists").value()) {
            this.db.set("artists", []).write();
        }
    }

    private initGroups() {
        if(!this.db.has("groups").value()) {
            this.db.set("groups", []).write();
        }
    }

    private initPlaylists() {
        if(!this.db.has("playlists").value()) {
            this.db.set("playlists", []).write();
        }
    }

    findGenre(genreName: string): number {
        return this.db.get("genres").value().findIndex((genre: Genre) => {
            return genre.name === genreName;
        });
    }

    findSong(songName: string): number {
        return this.db.get("songs").value().findIndex((song: Song) => {
            return song.name === songName;
        });
    }

    findAlbum(albumName: string): number {
        return this.db.get("albums").value().findIndex((album: Album) => {
            return album.name === albumName;
        });
    }

    findArtist(artistName: string): number {
        return this.db.get("artists").value().findIndex((artist: Artist) => {
            return artist.name === artistName;
        });
    }
    
    findGroup(groupName: string): number {
        return this.db.get("groups").value().findIndex((group: Group) => {
            return group.name === groupName;
        });
    }

    findPlaylist(playlistName: string): number {
        return this.db.get("playlists").value().findIndex((playlist: Playlist) => {
            return  playlist.name === playlistName;
        });
    }

    setGengre(genre: Genre) {
        this.db.get("genres").push(genre).write();
    }

    setSong(song: Song) {
        this.db.get("songs").push(song).write();
    }

    setAlbum(album: Album) {
        this.db.get("albums").push(album).write();
    }

    setArtist(artist: Artist) {
        this.db.get("artists").push(artist).write();
    }

    setGroup(group: Group) {
        this.db.get("groups").push(group).write();
    }

    setPlaylist(playlist: Playlist) {
        this.db.get("playlists").push(playlist).write();
    }

    getGenre(genreName: string): Genre | undefined {
        let indexOfGenre: number = this.findGenre(genreName);
        return this.db.get("genres").value().at(indexOfGenre);
    }

    getSong(songName: string): Song | undefined {
        let indexOfSong: number = this.findSong(songName);
        return this.db.get("songs").value().at(indexOfSong);
    }

    getAlbum(albumName: string): Album | undefined {
        let indexOfAlbum: number = this.findAlbum(albumName);
        return this.db.get("albums").value().at(indexOfAlbum);
    }

    getArtist(artistName: string): Artist | undefined {
        let indexOfArtist: number = this.findArtist(artistName);
        return this.db.get("artists").value().at(indexOfArtist);
    }

    getGroup(groupName: string): Group | undefined {
        let indexOfGroup: number = this.findGroup(groupName);
        return this.db.get("groups").value().at(indexOfGroup);
    }

    getPlaylist(playlistName: string): Playlist | undefined {
        let indexOfPlaylist: number = this.findPlaylist(playlistName);
        return this.db.get("playlists").value().at(indexOfPlaylist);
    }

    setSongToPlaylist(songName: string, playlistName: string) {
        let indexOfPlaylist = this.db.get("playlists").value().findIndex((playlist: Playlist) => {
            return playlist.name === playlistName;
        });

        this.db.get("playlists").value().at(indexOfPlaylist)?.songs.push(songName);
        this.db.write();
    }

    removePlaylist(playlistName: string) {
        let indexOfPlaylist: number = Number(this.db.get("playlists").findIndex(playlist => playlist.name === playlistName));
        this.db.get("playlists").splice(indexOfPlaylist, 1).write();
    }

    removeSongFromPlaylist(playlistName: string, nameSong: string) {
        let indexOfPlaylist: number = Number(this.db.get("playlists").findIndex(playlist => playlist.name === playlistName));
        let indexSong = this.db.get("playlists").value()[indexOfPlaylist].songs.indexOf(nameSong);
        this.db.get("playlists").value().at(indexOfPlaylist)?.songs.splice(indexSong, 1);
        this.db.write();
    }

    viewPlaylists() {
        this.db.get("playlists").value().forEach((playlist: Playlist) => {
            console.log(playlist.name);
        })
    }

    viewPlaylist(playlistName: string) {
        let indexOfPlaylist: number = Number(this.db.get("playlists").findIndex(playlist => playlist.name === playlistName));
        let durationOfPlaylist: number = this.db.get("playlists").value().at(indexOfPlaylist)?.duration as number;
        let horas = Math.floor(durationOfPlaylist);
        let minutos = Math.floor((durationOfPlaylist - horas) * 100);

        console.log("[" + playlistName +"]    Duration: " + horas + " hours and " + minutos + " minutes");
        this.db.get("playlists").value().at(indexOfPlaylist)?.songs.forEach((song: string) => {
            console.log(song);
        })
    }

    updateDurationPlaylist(playlistName: string) {
        let indexOfSong: number;
        let songs: string[] = [];
        let indexOfPlaylist: number = Number(this.db.get("playlists").findIndex(playlist => playlist.name === playlistName));
        let newduration = 0;
        let min = 0; 
        let sec = 0; 
        let hour = 0;

        this.db.get("playlists")
            .find({name: playlistName})
            .value().songs
            .forEach((songName: string) => {
                indexOfSong = this.findSong(songName);
                newduration = (this.db.get("songs")
                .value().at(indexOfSong)?.duration as number);
                let auxarray = newduration
                min += Math.floor(newduration);
                sec += parseFloat(((newduration - Math.floor(newduration)) * 100).toFixed(2));
        });

        min += Math.floor(sec/60);
        hour = Math.floor(min/60);
        min = Math.floor(min - 60*hour);
        newduration = hour + (min/100);

        this.db.get("playlists")
            .find({name: playlistName})
            .assign({duration : newduration})
            .write();
    }

    alphabeticalSongNameSort(playlistName: string) {
        let indexOfPlaylist: number = Number(this.db.get("playlists").findIndex(playlist => playlist.name === playlistName));
        this.db.get("playlists").value().at(indexOfPlaylist)?.songs.sort((song1: string, song2: string) => {
            return song1.normalize().localeCompare(song2.normalize());
        });
        this.db.write();
    }

    alphabeticalAuthorNameSort(playlistName: string) {
        let indexOfPlaylist: number = Number(this.db.get("playlists").findIndex(playlist => playlist.name === playlistName));
        this.db.get("playlists").value().at(indexOfPlaylist)?.songs.sort((song1: string, song2: string) => {
            let author1: string = this.db.get("songs").value().at(this.findSong(song1))?.author as string;
            let author2: string = this.db.get("songs").value().at(this.findSong(song2))?.author as string;;
            return author1.normalize().localeCompare(author2.normalize());
        });
        this.db.write();
    }

    durationSort(playlistName: string) {
        let indexOfPlaylist: number = Number(this.db.get("playlists").findIndex(playlist => playlist.name === playlistName));
        this.db.get("playlists").value().at(indexOfPlaylist)?.songs.sort((song1: string, song2: string) => {
            let duration1: number = this.db.get("songs").value().at(this.findSong(song1))?.duration as number;
            let duration2: number = this.db.get("songs").value().at(this.findSong(song2))?.duration as number;;
            return duration1 - duration2;
        });
        this.db.write();
    }

    numberOfReproductionSort(playlistName: string) {
        let indexOfPlaylist: number = Number(this.db.get("playlists").findIndex(playlist => playlist.name === playlistName));
        this.db.get("playlists").value().at(indexOfPlaylist)?.songs.sort((song1: string, song2: string) => {
            let reproductions1: number = this.db.get("songs").value().at(this.findSong(song1))?.numberReproductions as number;
            let reproductions2: number = this.db.get("songs").value().at(this.findSong(song2))?.numberReproductions as number;;
            return reproductions1 - reproductions2;
        });
        this.db.write();
    }
}
