import { Genre, Album, Song, Artist, Group, Playlist, Property } from './classes';
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

    setGenre(genre: Genre) {
        this.db.get("genres").push(genre).write();
    }

    setSong(song: Song) {
        this.db.get("songs").push(song).write();
    }

    setAlbum(album: Album) {
        this.db.get("albums").push(album).write();
    }

    setArtist(artist: Artist) {
        artist.genres.forEach(genre => {
            if (this.findGenre(genre) != -1) {
                
            }
        });
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

    getFormattedDurationPlaylist(playlist: Playlist): string {
        let out: string = "";
        if (playlist !== undefined) {
            let hours = Math.floor(playlist.duration);
            let minutes = Math.floor((playlist.duration - hours) * 100);
            out = "Duration: " + hours + " hours and " + minutes + " minutes";
        } else {
            out = "ERROR: The playlist was not located to calculate its duration";
        }
        return out;
    }

    getFormattedDurationSong(song: Song): string {
        let out: string = "";
        if (song !== undefined) {
            let minutes = Math.floor(song.duration);
            let seconds = Math.floor((song.duration - minutes) * 100);
            out = "[" + minutes + " min " + seconds + " sec]";
        } else {
            out = "ERROR: The song was not located to calculate its duration";
        }
        return out;
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

    changeOwnerOfPlaylist(playlistName: string, newowner: Property) {
        this.db.get("playlists")
            .find({name: playlistName})
            .assign({owner : newowner})
            .write();
    }

    viewPlaylists() {
        let show: string = "";
        console.log("---LIST OF PLAYLISTS---");
        this.db.get("playlists").value().forEach((playlist: Playlist) => {
            show = playlist.name;
            show += "\n  Genres: [" + playlist.genres.toString() + "]";
            show += "\n  " + this.getFormattedDurationPlaylist(playlist);
            console.log(show);
        })
    }

    viewPlaylist(playlistName: string) {
        let playlist = this.getPlaylist(playlistName);
        let showSong: string = "";
        if (playlist !== undefined) {
            console.log("[" + playlist.name +"] " + this.getFormattedDurationPlaylist(playlist) + "\n");
            playlist.songs.forEach((song: string) => {
                let dbsong = this.getSong(song);
                if (dbsong !== undefined) {
                    showSong = dbsong.name + " | " + dbsong.author + " | ";
                    showSong += this.getFormattedDurationSong(dbsong);
                    showSong += " | [" + dbsong.genres.toString() + "] | Reprd. " + dbsong.numberReproductions + "\n";
                    console.log(showSong);
                } else {
                    console.log("ERROR: Song not found");
                }
            })
        } else {
            console.log("ERROR: Playlist not found");
        }
    }

    updateDurationPlaylist(playlistName: string) {
        let indexOfSong: number;
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
                min += Math.floor(newduration);
                sec += parseFloat(((newduration - Math.floor(newduration)) * 100).toFixed(2));
            }
        );

        min += Math.floor(sec/60);
        hour = Math.floor(min/60);
        min = Math.floor(min - 60*hour);
        newduration = hour + (min/100);

        this.db.get("playlists")
            .find({name: playlistName})
            .assign({duration : newduration})
            .write();
    }

    updateGenresPlaylist(playlistName: string) {
        let newGenres: string[] = [];
        this.db.get("playlists")
            .find({name: playlistName})
            .value().songs
            .forEach((songName: string) => {
                let dbsong = this.getSong(songName);
                if (dbsong !== undefined) {
                    dbsong.genres.forEach((genreName: string) => {
                        if (!newGenres.includes(genreName)) {
                            newGenres.push(genreName);
                        }
                    })
                } else {
                    console.log("ERROR: Song not found to update genres playlist");
                }
            })
        
        this.db.get("playlists")
            .find({name: playlistName})
            .assign({genres : newGenres})
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

    removeGenre(genreName: string) {
        let indexOfGenre: number = this.findGenre(genreName);
        this.db.get("genres").splice(indexOfGenre, 1).write();
    }

    removeArtist(artistName: string) {
        let indexOfArtist: number = this.findArtist(artistName);
        this.db.get("artists").splice(indexOfArtist, 1).write();
    }

    removeGroup(groupName: string) {
        let indexOfGroup: number = this.findGroup(groupName);
        this.db.get("groups").splice(indexOfGroup, 1).write();
    }

    removeSong(songName: string) {
        let indexOfSong: number = this.findSong(songName);
        this.db.get("songs").splice(indexOfSong, 1).write();
    }

    removeAlbum(albumName: string) {
        let indexOfAlbum: number = this.findAlbum(albumName);
        this.db.get("albums").splice(indexOfAlbum, 1).write();
    }

    modifyAuthorsGenre(genreName: string, genreAuthors: string[]) {
        this.db.get("genres")
            .find({name: genreName})
            .assign({authors: genreAuthors})
            .write();
    }

    modifyAlbumsGenre(genreName: string, genreAlbums: string[]) {
        this.db.get("genres")
            .find({name: genreName})
            .assign({albums: genreAlbums})
            .write();
    }

    modifySongsGenre(genreName: string, genreSongs: string[]) {
        this.db.get("genres")
            .find({name: genreName})
            .assign({songs: genreSongs})
            .write();
    }

    modifyGroupsArtist(artistName: string, artistGroups: string[]) {
        this.db.get("artists")
            .find({name: artistName})
            .assign({groups: artistGroups})
            .write();
    }

    modifyGenresArtist(artistName: string, artistGenres: string[]) {
        this.db.get("artists")
            .find({name: artistName})
            .assign({genres: artistGenres})
            .write();
    }

    modifyAlbumsArtist(artistName: string, artistAlbums: string[]) {
        this.db.get("artists")
            .find({name: artistName})
            .assign({albums: artistAlbums})
            .write();
    }

    modifySongsArtist(artistName: string, artistSongs: string[]) {
        this.db.get("artists")
            .find({name: artistName})
            .assign({songs: artistSongs})
            .write();
    }

    modifyMonthlyListenersArtist(artistName: string, artistMonthlyListeners: number) {
        this.db.get("artists")
            .find({name: artistName})
            .assign({monthlyListeners: artistMonthlyListeners})
            .write();
    }

    modifyArtistsGroup(groupName: string, groupArtists: string[]) {
        this.db.get("groups")
            .find({name: groupName})
            .assign({artists: groupArtists})
            .write();
    }

    modifyYearCreationGroup(groupName: string, groupYearCreation: number) {
        this.db.get("groups")
            .find({name: groupName})
            .assign({yearCreation: groupYearCreation})
            .write();
    }

    modifyGenresGroup(groupName: string, groupGenres: string[]) {
        this.db.get("groups")
            .find({name: groupName})
            .assign({genres: groupGenres})
            .write();
    }

    modifyAlbumsGroup(groupName: string, groupAlbums: string[]) {
        this.db.get("groups")
            .find({name: groupName})
            .assign({albums: groupAlbums})
            .write();
    }

    modifyMonthlyListenersGroup(groupName: string, groupMonthlyListeners: number) {
        this.db.get("groups")
            .find({name: groupName})
            .assign({monthlyListeners: groupMonthlyListeners})
            .write();
    }

    modifyAuthorAlbum(albumName: string, albumAuthor: string) {
        this.db.get("albums")
            .find({name: albumName})
            .assign({author: albumAuthor})
            .write();
    }

    modifyYearPublicationAlbum(albumName: string, albumYearPublication: number) {
        this.db.get("albums")
            .find({name: albumName})
            .assign({yearPublication: albumYearPublication})
            .write();
    }

    modifyGenresAlbum(albumName: string, albumGenres: string[]) {
        this.db.get("albums")
            .find({name: albumName})
            .assign({genres: albumGenres})
            .write();
    }

    modifySongsAlbum(albumName: string, albumSongs: string[]) {
        this.db.get("albums")
            .find({name: albumName})
            .assign({songs: albumSongs})
            .write();
    }

    modifyAuthorSong(songName: string, songAuthor: string) {
        this.db.get("songs")
            .find({name: songName})
            .assign({author: songAuthor})
            .write();
    }

    modifyDurationSong(songName: string, songDuration: number) {
        this.db.get("songs")
            .find({name: songName})
            .assign({duration: songDuration})
            .write();
    }

    modifyGenresSong(songName: string, songGenres: string[]) {
        this.db.get("songs")
            .find({name: songName})
            .assign({genres: songGenres})
            .write();
    }

    modifySingleSong(songName: string, songSingle: boolean) {
        this.db.get("songs")
            .find({name: songName})
            .assign({single: songSingle})
            .write();
    }

    modifyNumberReproductionsSong(songName: string, songNumberOfReproductions: number) {
        this.db.get("songs")
            .find({name: songName})
            .assign({numberOfReproduction: songNumberOfReproductions})
            .write();
    }

    viewSong(songName: string) {
        let song = this.getSong(songName);
        console.log("name: " + song?.name);
        console.log("author: " + song?.author);
        console.log("duration: " + song?.duration);
        console.log("genres: " + song?.genres);
        console.log("single: " + song?.single);
        console.log("number of reproductions: " + song?.numberReproductions);
    }

    viewGenre(genreName: string) {
        let genre = this.getGenre(genreName);
        console.log("name: " + genre?.name);
        console.log("authors: " + genre?.authors);
        console.log("albums: " + genre?.albums);
        console.log("songs: " + genre?.songs);
    }

    viewAlbum(albumName: string) {
        let album = this.getAlbum(albumName);
        console.log("name: " + album?.name);
        console.log("author: " + album?.author);
        console.log("year of publication:" + album?.yearPublication);
        console.log("genres: " + album?.genres);
        console.log("songs: " + album?.songs);
    }

    viewGroup(groupName: string) {
        let group = this.getGroup(groupName);
        console.log("name: " + group?.name);
        console.log("artists: " + group?.artists);
        console.log("year of creation: " + group?.yearCreation);
        console.log("genres: " + group?.genres);
        console.log("albums: " + group?.albums);
        console.log("monthly listeners: " + group?.monthlyListeners);
    }

    viewArtist(artistName: string) {
        let artist = this.getArtist(artistName);
        console.log("name: " + artist?.name);
        console.log("groups: " + artist?.groups);
        console.log("genres: " + artist?.genres);
        console.log("albums: " + artist?.albums);
        console.log("songs: " + artist?.songs);
        console.log("monthly listeners: " + artist?.monthlyListeners);
    }
}
