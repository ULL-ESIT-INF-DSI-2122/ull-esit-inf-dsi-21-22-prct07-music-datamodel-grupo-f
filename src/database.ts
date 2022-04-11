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
    }

    viewPlaylists() {
        this.db.get("playlists").value().forEach((playlist: Playlist) => {
            console.log(playlist.name);
        })
    }

    viewPlaylist(playlistName: string) {
        let indexOfPlaylist: number = Number(this.db.get("playlists").findIndex(playlist => playlist.name === playlistName));
        let durationOfPlaylist: number = this.db.get("playlists").value().at(indexOfPlaylist)?.duration as number;

        console.log("[" + playlistName +"]    Duration:" + durationOfPlaylist);
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
        let indexOfPlaylist: number = Number(this.db.get("playlists").findIndex(playlist => playlist.name === playlistName));
        let duration: number = this.db.get("playlists").value().at(indexOfPlaylist)?.duration as number;
        duration = 0;
        
        this.db.get("playlists").value().at(indexOfPlaylist)?.songs.forEach((songName: string) => {
            indexOfSong = this.findSong(songName);
            duration += this.db.get("songs").value().at(indexOfSong)?.duration as number;
        })

        this.db.get("playlists").value().at(indexOfPlaylist)?.setDuration(duration);
        this.db.write();
    }

    setArtist() {
        let a = new Artist("KAROL G", [], ["Reggeaton"], [], ["EL MAKINON"], 50134269);
        this.db.get("artists").push(a).write();
    }

    setGroup() {
        let g = new Group("KISS", ["Paul Stanley", "Gene Simmons", "Ace Frehley", "Eric Singer"], 1973, ["Rock"], [], 10236792);
        this.db.get("groups").push(g).write();
    }
}
