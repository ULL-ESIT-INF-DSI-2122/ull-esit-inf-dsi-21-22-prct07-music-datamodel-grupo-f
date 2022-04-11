"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBase = void 0;
const lowdb_1 = __importDefault(require("lowdb"));
const FileSync_1 = __importDefault(require("lowdb/adapters/FileSync"));
;
class DataBase {
    constructor() {
        const adapter = new FileSync_1.default("db.json");
        this.db = (0, lowdb_1.default)(adapter);
        this.initGenres();
        this.initAlbums();
        this.initSongs();
        this.initArtists();
        this.initGroups();
        this.initPlaylists();
    }
    initGenres() {
        if (!this.db.has("genres").value()) {
            this.db.set("genres", []).write();
        }
    }
    initAlbums() {
        if (!this.db.has("albums").value()) {
            this.db.set("albums", []).write();
        }
    }
    initSongs() {
        if (!this.db.has("songs").value()) {
            this.db.set("songs", []).write();
        }
    }
    initArtists() {
        if (!this.db.has("artists").value()) {
            this.db.set("artists", []).write();
        }
    }
    initGroups() {
        if (!this.db.has("groups").value()) {
            this.db.set("groups", []).write();
        }
    }
    initPlaylists() {
        if (!this.db.has("playlists").value()) {
            this.db.set("playlists", []).write();
        }
    }
    findSong(songName) {
        return this.db.get("songs").value().findIndex((song) => {
            return song.name === songName;
        });
    }
    findArtist(artistName) {
        return this.db.get("artists").value().findIndex((artist) => {
            return artist.name === artistName;
        });
    }
    findGroup(groupName) {
        return this.db.get("groups").value().findIndex((group) => {
            return group.name === groupName;
        });
    }
    findGenres(genres) {
        let indexOfGenres = [];
        let index = 0;
        genres.forEach((genre) => {
            index = Number(this.db.get("genres").findIndex((genreElement) => {
                return genreElement.name === genre;
            }));
            if (index != -1)
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
    setSongToPlaylist(songName, playlistName) {
        var _a;
        let indexOfPlaylist = this.db.get("playlists").value().findIndex((playlist) => {
            return playlist.name === playlistName;
        });
        (_a = this.db.get("playlists").value().at(indexOfPlaylist)) === null || _a === void 0 ? void 0 : _a.songs.push(songName);
        this.db.write();
    }
    setPlaylist(playlist) {
        this.db.get("playlists").push(playlist).write();
    }
    removePlaylist(playlistName) {
        let indexOfPlaylist = Number(this.db.get("playlists").findIndex(playlist => playlist.name === playlistName));
        this.db.get("playlists").splice(indexOfPlaylist, 1).write();
    }
    removeSongFromPlaylist(playlistName, nameSong) {
        var _a;
        let indexOfPlaylist = Number(this.db.get("playlists").findIndex(playlist => playlist.name === playlistName));
        let indexSong = this.db.get("playlists").value()[indexOfPlaylist].songs.indexOf(nameSong);
        (_a = this.db.get("playlists").value().at(indexOfPlaylist)) === null || _a === void 0 ? void 0 : _a.songs.splice(indexSong, 1);
        this.db.write();
        //this.db.get("playlists").value().at(indexOfPlaylist)?.setDuration
    }
    viewPlaylists() {
        this.db.get("playlists").value().forEach((playlist) => {
            console.log(playlist.name);
        });
    }
    viewPlaylist(playlistName) {
        var _a, _b;
        let indexOfPlaylist = Number(this.db.get("playlists").findIndex(playlist => playlist.name === playlistName));
        let durationOfPlaylist = (_a = this.db.get("playlists").value().at(indexOfPlaylist)) === null || _a === void 0 ? void 0 : _a.duration;
        let horas = Math.floor(durationOfPlaylist);
        let minutos = Math.floor((durationOfPlaylist - horas) * 100);
        console.log("[" + playlistName + "]    Duration: " + horas + " hours and " + minutos + " minutes");
        (_b = this.db.get("playlists").value().at(indexOfPlaylist)) === null || _b === void 0 ? void 0 : _b.songs.forEach((song) => {
            console.log(song);
        });
    }
    /*writeSong(song: string, playlistName: string) {
        let indexOfPlaylist: number = Number(this.db.get("playlists").findIndex(playlist => playlist.name === playlistName));
        this.db.get("playlists").value().at(indexOfPlaylist)?.songs.push(song);
        this.db.write();
    }*/
    updateDurationPlaylist(playlistName) {
        let indexOfSong;
        let songs = [];
        let indexOfPlaylist = Number(this.db.get("playlists").findIndex(playlist => playlist.name === playlistName));
        let newduration = 0;
        let min = 0;
        let sec = 0;
        let hour = 0;
        this.db.get("playlists")
            .find({ name: playlistName })
            .value().songs
            .forEach((songName) => {
            var _a;
            indexOfSong = this.findSong(songName);
            newduration = (_a = this.db.get("songs")
                .value().at(indexOfSong)) === null || _a === void 0 ? void 0 : _a.duration;
            let auxarray = newduration;
            min += Math.floor(newduration);
            sec += parseFloat(((newduration - Math.floor(newduration)) * 100).toFixed(2));
        });
        console.log("Minutos:" + min + " Segundos:" + sec);
        min += Math.floor(sec / 60);
        console.log("Minutos:" + min + " Segundos:" + sec);
        hour = Math.floor(min / 60);
        min = Math.floor(min - 60 * hour);
        console.log("Minutos:" + min + " Horas:" + hour);
        newduration = hour + (min / 100);
        console.log("Duration:" + newduration);
        this.db.get("playlists")
            .find({ name: playlistName })
            .assign({ duration: newduration })
            .write();
    }
    setGengre(genre) {
        this.db.get("genres").push(genre).write();
    }
    setSong(song) {
        this.db.get("songs").push(song).write();
    }
    setAlbum(album) {
        this.db.get("albums").push(album).write();
    }
    setArtist(artist) {
        this.db.get("artists").push(artist).write();
    }
    setGroup(group) {
        this.db.get("groups").push(group).write();
    }
    alphabeticalSongNameSort(playlistName) {
        var _a;
        let indexOfPlaylist = Number(this.db.get("playlists").findIndex(playlist => playlist.name === playlistName));
        (_a = this.db.get("playlists").value().at(indexOfPlaylist)) === null || _a === void 0 ? void 0 : _a.songs.sort((song1, song2) => {
            return song1.normalize().localeCompare(song2.normalize());
        });
        this.db.write();
    }
    alphabeticalAuthorNameSort(playlistName) {
        var _a;
        let indexOfPlaylist = Number(this.db.get("playlists").findIndex(playlist => playlist.name === playlistName));
        (_a = this.db.get("playlists").value().at(indexOfPlaylist)) === null || _a === void 0 ? void 0 : _a.songs.sort((song1, song2) => {
            let author1 = "";
            let author2 = "";
            return author1.normalize().localeCompare(author2.normalize());
        });
        this.db.write();
    }
    durationSort(playlistName) {
    }
    numberOfReproductionSort(playlistName) { }
}
exports.DataBase = DataBase;
//# sourceMappingURL=database.js.map