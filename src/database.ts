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

    findSong(songName: string): number {
        return this.db.get("songs").value().findIndex((song: Song) => {
            return song.name === songName;
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

    findGenres(genres: string[]): number[] {
        let indexOfGenres: number[] = [];
        let index: number = 0;

        genres.forEach((genre: string) => {
            index = Number(this.db.get("genres").findIndex((genreElement: Genre) => {
                return genreElement.name === genre;
            }));

            if(index != -1)
                indexOfGenres.push(index);
        });

        console.log(indexOfGenres);
        return indexOfGenres;
    }

    /*setSong(song: Song) {
        
         * existe el autor?
         * [yes]-> añadir cancion al autor
         * [no]-> crear autor
         * existe género?
         * [yes]-> añadir cancion al genero
         * [no]-> crear genero 
        
        if(this.findArtist(song.author) != -1)
        {
            let indexOfArtist = this.findArtist(song.author);
            this.db.get("artists").value().at(indexOfArtist)?.songs.push(song.name);
            this.db.write();
        }
        else if(this.findGroup(song.author) != -1)
        {
            //let indexOfGroup = this.findArtist(song.author);
            //this.db.get("groups").value().at(indexOfGroup)?.songs.push(song.name);
            //this.db.write();
        }
        else
        {
            let artist: Artist = new Artist(song.author, [], song.genres, [], [song.name], 0);
            this.db.get("artists").push(artist).write();
        }
        
        if(this.findGenres(song.genres) !== [])
        {
            console.log("hola");
            let indexOfGenres: number[] = this.findGenres(song.genres);
            for(let i: number = 0; i < indexOfGenres.length; ++i)
            {
                this.db.get("genres").value().at(indexOfGenres[i])?.songs.push(song.name);
                this.db.write();
            }
        }
        else
        {
            console.log("hola");
            let genre: Genre;
            for(let i: number = 0; i < song.genres.length; ++i)
            {
                console.log("hola");
                genre = new Genre(song.genres[i], [song.author], [], [song.name]);
                this.db.get("genres").push().write();
            }
        }

        this.db.get("songs").push(song).write();
    }*/

    setSongToPlaylist(songName: string, playlistName: string) {
        let indexOfPlaylist = this.db.get("playlists").value().findIndex((playlist: Playlist) => {
            return playlist.name === playlistName;
        });

        this.db.get("playlists").value().at(indexOfPlaylist)?.songs.push(songName);
        this.db.write();
    }

    setPlaylist(playlist: Playlist) {
        this.db.get("playlists").push(playlist).write();
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
        //this.db.get("playlists").value().at(indexOfPlaylist)?.setDuration
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

    /*writeSong(song: string, playlistName: string) {
        let indexOfPlaylist: number = Number(this.db.get("playlists").findIndex(playlist => playlist.name === playlistName));
        this.db.get("playlists").value().at(indexOfPlaylist)?.songs.push(song);
        this.db.write();
    }*/

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
            let author1: string = "";
            let author2: string = "";
            return author1.normalize().localeCompare(author2.normalize());
        });
        this.db.write();
    }

    durationSort(playlistName: string) {

    }

    numberOfReproductionSort(playlistName: string) {}
}
