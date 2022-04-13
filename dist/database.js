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
    findGenre(genreName) {
        return this.db.get("genres").value().findIndex((genre) => {
            return genre.name === genreName;
        });
    }
    findSong(songName) {
        return this.db.get("songs").value().findIndex((song) => {
            return song.name === songName;
        });
    }
    findAlbum(albumName) {
        return this.db.get("albums").value().findIndex((album) => {
            return album.name === albumName;
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
    findPlaylist(playlistName) {
        return this.db.get("playlists").value().findIndex((playlist) => {
            return playlist.name === playlistName;
        });
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
    setPlaylist(playlist) {
        this.db.get("playlists").push(playlist).write();
    }
    getGenre(genreName) {
        let indexOfGenre = this.findGenre(genreName);
        return this.db.get("genres").value().at(indexOfGenre);
    }
    getSong(songName) {
        let indexOfSong = this.findSong(songName);
        return this.db.get("songs").value().at(indexOfSong);
    }
    getAlbum(albumName) {
        let indexOfAlbum = this.findAlbum(albumName);
        return this.db.get("albums").value().at(indexOfAlbum);
    }
    getArtist(artistName) {
        let indexOfArtist = this.findArtist(artistName);
        return this.db.get("artists").value().at(indexOfArtist);
    }
    getGroup(groupName) {
        let indexOfGroup = this.findGroup(groupName);
        return this.db.get("groups").value().at(indexOfGroup);
    }
    getPlaylist(playlistName) {
        let indexOfPlaylist = this.findPlaylist(playlistName);
        return this.db.get("playlists").value().at(indexOfPlaylist);
    }
    getFormattedDurationPlaylist(playlist) {
        let out = "";
        if (playlist !== undefined) {
            let hours = Math.floor(playlist.duration);
            let minutes = Math.floor((playlist.duration - hours) * 100);
            out = "Duration: " + hours + " hours and " + minutes + " minutes";
        }
        else {
            out = "ERROR: The playlist was not located to calculate its duration";
        }
        return out;
    }
    getFormattedDurationSong(song) {
        let out = "";
        if (song !== undefined) {
            let minutes = Math.floor(song.duration);
            let seconds = Math.floor((song.duration - minutes) * 100);
            out = "[" + minutes + " min " + seconds + " sec]";
        }
        else {
            out = "ERROR: The song was not located to calculate its duration";
        }
        return out;
    }
    setSongToPlaylist(songName, playlistName) {
        var _a;
        let indexOfPlaylist = this.db.get("playlists").value().findIndex((playlist) => {
            return playlist.name === playlistName;
        });
        (_a = this.db.get("playlists").value().at(indexOfPlaylist)) === null || _a === void 0 ? void 0 : _a.songs.push(songName);
        this.db.write();
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
    }
    changeOwnerOfPlaylist(playlistName, newowner) {
        this.db.get("playlists")
            .find({ name: playlistName })
            .assign({ owner: newowner })
            .write();
    }
    viewPlaylists() {
        let show = "";
        console.log("---LIST OF PLAYLISTS---");
        this.db.get("playlists").value().forEach((playlist) => {
            show = playlist.name;
            show += "\n  Genres: [" + playlist.genres.toString() + "]";
            show += "\n  " + this.getFormattedDurationPlaylist(playlist);
            console.log(show);
        });
    }
    viewPlaylist(playlistName) {
        let playlist = this.getPlaylist(playlistName);
        let showSong = "";
        if (playlist !== undefined) {
            console.log("[" + playlist.name + "] " + this.getFormattedDurationPlaylist(playlist) + "\n");
            playlist.songs.forEach((song) => {
                let dbsong = this.getSong(song);
                if (dbsong !== undefined) {
                    showSong = dbsong.name + " | " + dbsong.author + " | ";
                    showSong += this.getFormattedDurationSong(dbsong);
                    showSong += " | [" + dbsong.genres.toString() + "] | Reprd. " + dbsong.numberReproductions + "\n";
                    console.log(showSong);
                }
                else {
                    console.log("ERROR: Song not found");
                }
            });
        }
        else {
            console.log("ERROR: Playlist not found");
        }
    }
    updateDurationPlaylist(playlistName) {
        let indexOfSong;
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
            min += Math.floor(newduration);
            sec += parseFloat(((newduration - Math.floor(newduration)) * 100).toFixed(2));
        });
        min += Math.floor(sec / 60);
        hour = Math.floor(min / 60);
        min = Math.floor(min - 60 * hour);
        newduration = hour + (min / 100);
        this.db.get("playlists")
            .find({ name: playlistName })
            .assign({ duration: newduration })
            .write();
    }
    updateGenresPlaylist(playlistName) {
        let newGenres = [];
        this.db.get("playlists")
            .find({ name: playlistName })
            .value().songs
            .forEach((songName) => {
            let dbsong = this.getSong(songName);
            if (dbsong !== undefined) {
                dbsong.genres.forEach((genreName) => {
                    if (!newGenres.includes(genreName)) {
                        newGenres.push(genreName);
                    }
                });
            }
            else {
                console.log("ERROR: Song not found to update genres playlist");
            }
        });
        this.db.get("playlists")
            .find({ name: playlistName })
            .assign({ genres: newGenres })
            .write();
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
            var _a, _b;
            let author1 = (_a = this.db.get("songs").value().at(this.findSong(song1))) === null || _a === void 0 ? void 0 : _a.author;
            let author2 = (_b = this.db.get("songs").value().at(this.findSong(song2))) === null || _b === void 0 ? void 0 : _b.author;
            ;
            return author1.normalize().localeCompare(author2.normalize());
        });
        this.db.write();
    }
    durationSort(playlistName) {
        var _a;
        let indexOfPlaylist = Number(this.db.get("playlists").findIndex(playlist => playlist.name === playlistName));
        (_a = this.db.get("playlists").value().at(indexOfPlaylist)) === null || _a === void 0 ? void 0 : _a.songs.sort((song1, song2) => {
            var _a, _b;
            let duration1 = (_a = this.db.get("songs").value().at(this.findSong(song1))) === null || _a === void 0 ? void 0 : _a.duration;
            let duration2 = (_b = this.db.get("songs").value().at(this.findSong(song2))) === null || _b === void 0 ? void 0 : _b.duration;
            ;
            return duration1 - duration2;
        });
        this.db.write();
    }
    numberOfReproductionSort(playlistName) {
        var _a;
        let indexOfPlaylist = Number(this.db.get("playlists").findIndex(playlist => playlist.name === playlistName));
        (_a = this.db.get("playlists").value().at(indexOfPlaylist)) === null || _a === void 0 ? void 0 : _a.songs.sort((song1, song2) => {
            var _a, _b;
            let reproductions1 = (_a = this.db.get("songs").value().at(this.findSong(song1))) === null || _a === void 0 ? void 0 : _a.numberReproductions;
            let reproductions2 = (_b = this.db.get("songs").value().at(this.findSong(song2))) === null || _b === void 0 ? void 0 : _b.numberReproductions;
            ;
            return reproductions1 - reproductions2;
        });
        this.db.write();
    }
}
exports.DataBase = DataBase;
//# sourceMappingURL=database.js.map