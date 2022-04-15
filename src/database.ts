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

    /**
     * Constructor
     */
    constructor(private readonly fileName: string) {
        const adapter = new FileSync<Schema>(fileName);
        this.db = lowdb(adapter);
        this.initGenres();
        this.initAlbums();
        this.initSongs();
        this.initArtists();
        this.initGroups();
        this.initPlaylists();
    }

    /**
     * Comprueba si hay un array de géneros
     * Si no existe lo crea
     */
    private initGenres() {
        if(!this.db.has("genres").value()) {
            this.db.set("genres", []).write();
        }
    }

    /**
     * Comprueba si hay un array de albums
     * Si no existe lo crea
     */
    private initAlbums() {
        if(!this.db.has("albums").value()) {
            this.db.set("albums", []).write();
        }
    }

    /**
     * Comprueba si hay un array de canciones
     * Si no existe lo crea
     */
    private initSongs() {
        if(!this.db.has("songs").value()) {
            this.db.set("songs", []).write();
        }
    }

    /**
     * Comprueba si hay un array de artistas
     * Si no existe lo crea
     */
    private initArtists() {
        if(!this.db.has("artists").value()) {
            this.db.set("artists", []).write();
        }
    }

    /**
     * Comprueba si hay un array de grupos
     * Si no existe lo crea
     */
    private initGroups() {
        if(!this.db.has("groups").value()) {
            this.db.set("groups", []).write();
        }
    }

    /**
     * Comprueba si hay un array de playlists
     * Si no existe lo crea
     */
    private initPlaylists() {
        if(!this.db.has("playlists").value()) {
            this.db.set("playlists", []).write();
        }
    }

    /**
     * Busca un género
     * @returns Indice del género en la base de datos
     */
    findGenre(genreName: string): number {
        return this.db.get("genres").value().findIndex((genre: Genre) => {
            return genre.name === genreName;
        });
    }

    /**
     * Busca una canción
     * @returns Indice de la canción en la base de datos
     */
    findSong(songName: string): number {
        return this.db.get("songs").value().findIndex((song: Song) => {
            return song.name === songName;
        });
    }

    /**
     * Busca un album
     * @returns Indice del album en la base de datos
     */
    findAlbum(albumName: string): number {
        return this.db.get("albums").value().findIndex((album: Album) => {
            return album.name === albumName;
        });
    }

    /**
     * Busca un artista
     * @returns Indice del artista en la base de datos
     */
    findArtist(artistName: string): number {
        return this.db.get("artists").value().findIndex((artist: Artist) => {
            return artist.name === artistName;
        });
    }
    
    /**
     * Busca un grupo
     * @returns Indice del grupo en la base de datos
     */
    findGroup(groupName: string): number {
        return this.db.get("groups").value().findIndex((group: Group) => {
            return group.name === groupName;
        });
    }

    /**
     * Busca una playlist
     * @returns Indice de la playlist en la base de datos
     */
    findPlaylist(playlistName: string): number {
        return this.db.get("playlists").value().findIndex((playlist: Playlist) => {
            return  playlist.name === playlistName;
        });
    }

    /**
     * Mete un género en la base de datos
     * @param genre Género a meter
     */
    setGenre(genre: Genre) {
        this.db.get("genres").push(genre).write();
    }

    /**
     * Mete una canción en la base de datos
     * @param song Canción a meter
     */
    setSong(song: Song) {
        this.db.get("songs").push(song).write();
    }

    /**
     * Mete un album en la base de datos
     * @param album Album a meter
     */
    setAlbum(album: Album) {
        this.db.get("albums").push(album).write();
    }

    /**
     * Mete un artista en la base de datos
     * @param artist Artista a meter
     */
    setArtist(artist: Artist) {
        this.db.get("artists").push(artist).write();
    }

    /**
     * Mete un grupo en la base de datos
     * @param group Grupo a meter
     */
    setGroup(group: Group) {
        this.db.get("groups").push(group).write();
    }

    /**
     * Mete una playlist en la base de datos
     * @param platlist Playlist a meter
     */
    setPlaylist(playlist: Playlist) {
        this.db.get("playlists").push(playlist).write();
    }

    /**
     * Devuelve un género
     * @param genreName Nombre del género
     * @returns Género a devolver
     */
    getGenre(genreName: string): Genre {
        let indexOfGenre: number = this.findGenre(genreName);
        return this.db.get("genres").value().at(indexOfGenre) as Genre;
    }

    /**
     * Devuelve una canción
     * @param songName Nombre de la canción
     * @returns Canción a devolver
     */
    getSong(songName: string): Song {
        let indexOfSong: number = this.findSong(songName);
        return this.db.get("songs").value().at(indexOfSong) as Song;
    }

    /**
     * Devuelve un album
     * @param albumName Nombre del album
     * @returns Album a devolver
     */
    getAlbum(albumName: string): Album {
        let indexOfAlbum: number = this.findAlbum(albumName);
        return this.db.get("albums").value().at(indexOfAlbum) as Album;
    }

    /**
     * Devuelve un artista
     * @param artistName Nombre del artista
     * @returns Artista a devolver
     */
    getArtist(artistName: string): Artist {
        let indexOfArtist: number = this.findArtist(artistName);
        return this.db.get("artists").value().at(indexOfArtist) as Artist;
    }

    /**
     * Devuelve un grupo
     * @param groupName Nombre del grupo
     * @returns Grupo a devolver
     */
    getGroup(groupName: string): Group {
        let indexOfGroup: number = this.findGroup(groupName);
        return this.db.get("groups").value().at(indexOfGroup) as Group;
    }

    /**
     * Devuelve una playlist
     * @param playlistName Nombre de la playlist
     * @returns Playlist a devolver
     */
    getPlaylist(playlistName: string): Playlist {
        let indexOfPlaylist: number = this.findPlaylist(playlistName);
        return this.db.get("playlists").value().at(indexOfPlaylist) as Playlist;
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
    
    /**
     * Mete el nombre de una canción en una playlist
     * @param songName Nombre de la canción
     * @param playlistName Nombre de la playlist
     */
    setSongToPlaylist(songName: string, playlistName: string) {
        let indexOfPlaylist = this.db.get("playlists").value().findIndex((playlist: Playlist) => {
            return playlist.name === playlistName;
        });

        this.db.get("playlists").value().at(indexOfPlaylist)?.songs.push(songName);
        this.db.write();
    }

    /**
     * Elimina una playlist
     * @param playlistName Nombre de la playlist
     */
    removePlaylist(playlistName: string) {
        let indexOfPlaylist: number = Number(this.db.get("playlists").findIndex(playlist => playlist.name === playlistName));
        this.db.get("playlists").splice(indexOfPlaylist, 1).write();
    }

    /**
     * Elimina una canción de una playlist
     * @param playlistName Nombre de la playlist
     * @param nameSong Nombre de la canción
     */
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

    /**
     * Función que devulve información de las playlists
     * @returns Información de las playlists
     */
    viewPlaylists(): string {
        let show: string = "";
        show += "---LIST OF PLAYLISTS---\n";
        this.db.get("playlists").value().forEach((playlist: Playlist) => {
            show +=  "\n" + playlist.name;
            show += "\n  Genres: [" + playlist.genres.toString() + "]";
            show += "\n  " + this.getFormattedDurationPlaylist(playlist);
        })
        return show;
    }

    /**
     * Función que devulve información de una playlist
     * @returns Información de la playlist
     */
    viewPlaylist(playlistName: string): string {
        let playlist = this.getPlaylist(playlistName);
        let showSong: string = "";
        if (this.findPlaylist(playlistName) !== -1) {
            showSong += "[" + playlist.name +"] " + this.getFormattedDurationPlaylist(playlist) + "\n";
            playlist.songs.forEach((song: string) => {
                let dbsong = this.getSong(song);
                if (dbsong !== undefined) {
                    showSong += dbsong.name + " | " + dbsong.author + " | ";
                    showSong += this.getFormattedDurationSong(dbsong) + "\n";
                    showSong += " | [" + dbsong.genres.toString() + "] | Reprd. " + dbsong.numberReproductions + "\n";
                }
            })
        } else {
            showSong = "ERROR: Playlist not found";
        }
        return showSong;
    }

    /**
     * Actualiza la duración de una playlist
     * @param playlistName Nombre de la playlist
     */
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

    /**
     * Ordena las canciones de una playlist por género
     * @param genreName Nombre del género
     * @param playlistName Nombre de la playlist
     */
    genreSort(genreName: string, playlistName: string) {
        let indexOfPlaylist: number = Number(this.db.get("playlists").findIndex(playlist => playlist.name === playlistName));
        this.db.get("playlists").value().at(indexOfPlaylist)?.songs.sort((song1: string, song2: string) => {
            let genre1: string = this.db.get("songs").value().at(this.findSong(song1))?.genres[0] as string;
            let genre2: string = this.db.get("songs").value().at(this.findSong(song2))?.genres[0] as string;
            let n1: number = Number(genre1 === genreName);
            let n2: number = Number(genre2 === genreName)
            return n2 - n1;
        });
        this.db.write();
    }

    /**
     * Ordena las canciones de una playlist alfabeticamente por su nombre
     * @param playlistName Nombre de la playlist
     */
    alphabeticalSongNameSort(playlistName: string) {
        let indexOfPlaylist: number = Number(this.db.get("playlists").findIndex(playlist => playlist.name === playlistName));
        this.db.get("playlists").value().at(indexOfPlaylist)?.songs.sort((song1: string, song2: string) => {
            return song1.normalize().localeCompare(song2.normalize());
        });
        this.db.write();
    }

    /**
     * Ordena las canciones de una playlist alfabeticamente por el nombre del autor
     * @param playlistName Nombre de la playlist
     */
    alphabeticalAuthorNameSort(playlistName: string) {
        let indexOfPlaylist: number = Number(this.db.get("playlists").findIndex(playlist => playlist.name === playlistName));
        this.db.get("playlists").value().at(indexOfPlaylist)?.songs.sort((song1: string, song2: string) => {
            let author1: string = this.db.get("songs").value().at(this.findSong(song1))?.author as string;
            let author2: string = this.db.get("songs").value().at(this.findSong(song2))?.author as string;;
            return author1.normalize().localeCompare(author2.normalize());
        });
        this.db.write();
    }

    /**
     * Ordena las canciones de una playlist alfabeticamente por su duración
     * @param playlistName Nombre de la playlist
     */
    durationSort(playlistName: string) {
        let indexOfPlaylist: number = Number(this.db.get("playlists").findIndex(playlist => playlist.name === playlistName));
        this.db.get("playlists").value().at(indexOfPlaylist)?.songs.sort((song1: string, song2: string) => {
            let duration1: number = this.db.get("songs").value().at(this.findSong(song1))?.duration as number;
            let duration2: number = this.db.get("songs").value().at(this.findSong(song2))?.duration as number;;
            return duration1 - duration2;
        });
        this.db.write();
    }

    /**
     * Ordena las canciones de una playlist alfabeticamente por sus reproducciones
     * @param playlistName Nombre de la playlist
     */
    numberOfReproductionSort(playlistName: string) {
        let indexOfPlaylist: number = Number(this.db.get("playlists").findIndex(playlist => playlist.name === playlistName));
        this.db.get("playlists").value().at(indexOfPlaylist)?.songs.sort((song1: string, song2: string) => {
            let reproductions1: number = this.db.get("songs").value().at(this.findSong(song1))?.numberReproductions as number;
            let reproductions2: number = this.db.get("songs").value().at(this.findSong(song2))?.numberReproductions as number;;
            return reproductions1 - reproductions2;
        });
        this.db.write();
    }

    /**
     * Elimina un género
     * @param genreName Nombre del género
     */
    removeGenre(genreName: string) {
        let indexOfGenre: number = this.findGenre(genreName);
        this.db.get("genres").splice(indexOfGenre, 1).write();
    }

    /**
     * Elimina un artista
     * @param artistName Nombre del artista
     */
    removeArtist(artistName: string) {
        let indexOfArtist: number = this.findArtist(artistName);
        this.db.get("artists").splice(indexOfArtist, 1).write();
    }

    /**
     * Elimina un grupo
     * @param groupName Nombre del grupo
     */
    removeGroup(groupName: string) {
        let indexOfGroup: number = this.findGroup(groupName);
        this.db.get("groups").splice(indexOfGroup, 1).write();
    }

    /**
     * Elimina una canción
     * @param songName Nombre de la canción
     */
    removeSong(songName: string) {
        let indexOfSong: number = this.findSong(songName);
        this.db.get("songs").splice(indexOfSong, 1).write();
    }

    /**
     * Elimina un album
     * @param albumName Nombre de la album
     */
    removeAlbum(albumName: string) {
        let indexOfAlbum: number = this.findAlbum(albumName);
        this.db.get("albums").splice(indexOfAlbum, 1).write();
    }

    /**
     * Modifica el autor de un género
     * @param genreName Nombre del género
     * @param genreAuthors Autor del género
     */
    modifyAuthorsGenre(genreName: string, genreAuthors: string[]) {
        this.db.get("genres")
            .find({name: genreName})
            .assign({authors: genreAuthors})
            .write();
    }

    /**
     * Modifica los albumes de un género
     * @param genreName Nombre del género
     * @param genreAlbums Albumes del género
     */
    modifyAlbumsGenre(genreName: string, genreAlbums: string[]) {
        this.db.get("genres")
            .find({name: genreName})
            .assign({albums: genreAlbums})
            .write();
    }

    /**
     * Modifica las canciones de un género
     * @param genreName Nombre del género
     * @param genreSongs Canciones del género
     */
    modifySongsGenre(genreName: string, genreSongs: string[]) {
        this.db.get("genres")
            .find({name: genreName})
            .assign({songs: genreSongs})
            .write();
    }

    /**
     * Modifica los grupos del artista
     * @param artistName Nombre del artista
     * @param artistGroups Grupos a los que pertenece el artista
     */
    modifyGroupsArtist(artistName: string, artistGroups: string[]) {
        this.db.get("artists")
            .find({name: artistName})
            .assign({groups: artistGroups})
            .write();
    }

    /**
     * Modifica los géneros del artista
     * @param artistName Nombre del artista
     * @param artistGenres Géneros del artista
     */
    modifyGenresArtist(artistName: string, artistGenres: string[]) {
        this.db.get("artists")
            .find({name: artistName})
            .assign({genres: artistGenres})
            .write();
    }

    /**
     * Modifica los albumes del artista
     * @param artistName Nombre del artista
     * @param artistAlbums Albumes del artista
     */
    modifyAlbumsArtist(artistName: string, artistAlbums: string[]) {
        this.db.get("artists")
            .find({name: artistName})
            .assign({albums: artistAlbums})
            .write();
    }

    /**
     * Modifica las canciones del artista
     * @param artistName Nombre del artista
     * @param artistSongs Canciones del artista
     */
    modifySongsArtist(artistName: string, artistSongs: string[]) {
        this.db.get("artists")
            .find({name: artistName})
            .assign({songs: artistSongs})
            .write();
    }

    /**
     * Modifica los oyentes mensuales del artista
     * @param artistName Nombre del artista
     * @param artistMonthlyListeners Oyentes mensuales del artista
     */
    modifyMonthlyListenersArtist(artistName: string, artistMonthlyListeners: number) {
        this.db.get("artists")
            .find({name: artistName})
            .assign({monthlyListeners: artistMonthlyListeners})
            .write();
    }

    /**
     * Modifica los artistas del grupo
     * @param groupName Nombre del grupo
     * @param groupArtists Artistas del grupo
     */
    modifyArtistsGroup(groupName: string, groupArtists: string[]) {
        this.db.get("groups")
            .find({name: groupName})
            .assign({artists: groupArtists})
            .write();
    }

    /**
     * Modifica el año de creación del grupo
     * @param groupName Nombre del grupo
     * @param groupYearCreation Año de creación del grupo
     */
    modifyYearCreationGroup(groupName: string, groupYearCreation: number) {
        this.db.get("groups")
            .find({name: groupName})
            .assign({yearCreation: groupYearCreation})
            .write();
    }

    /**
     * Modifica los géneros del grupo
     * @param groupName Nombre del grupo
     * @param groupGenres Géneros del grupo
     */
    modifyGenresGroup(groupName: string, groupGenres: string[]) {
        this.db.get("groups")
            .find({name: groupName})
            .assign({genres: groupGenres})
            .write();
    }

    /**
     * Modifica los albumes del grupo
     * @param groupName Nombre del grupo
     * @param groupAlbums Albumes del grupo
     */
    modifyAlbumsGroup(groupName: string, groupAlbums: string[]) {
        this.db.get("groups")
            .find({name: groupName})
            .assign({albums: groupAlbums})
            .write();
    }

    /**
     * Modifica los oyentes mensuales del grupo
     * @param groupName Nombre del grupo
     * @param groupMonthlyListeners Oyentes mensuales del grupo
     */
    modifyMonthlyListenersGroup(groupName: string, groupMonthlyListeners: number) {
        this.db.get("groups")
            .find({name: groupName})
            .assign({monthlyListeners: groupMonthlyListeners})
            .write();
    }

    /**
     * Modifica el autor del album
     * @param albumName Nombre del album
     * @param albumAuthor Autor del album
     */
    modifyAuthorAlbum(albumName: string, albumAuthor: string) {
        this.db.get("albums")
            .find({name: albumName})
            .assign({author: albumAuthor})
            .write();
    }

    /**
     * Modifica el año de publicación del album
     * @param albumName Nombre del album
     * @param albumYearPublication Año de publicación del album
     */
    modifyYearPublicationAlbum(albumName: string, albumYearPublication: number) {
        this.db.get("albums")
            .find({name: albumName})
            .assign({yearPublication: albumYearPublication})
            .write();
    }

    /**
     * Modifica los géneros del album
     * @param albumName Nombre del album
     * @param albumGenres Géneros del album
     */
    modifyGenresAlbum(albumName: string, albumGenres: string[]) {
        this.db.get("albums")
            .find({name: albumName})
            .assign({genres: albumGenres})
            .write();
    }

    /**
     * Modifica las canciones del album
     * @param albumName Nombre del album
     * @param albumSongs Canciones del album
     */
    modifySongsAlbum(albumName: string, albumSongs: string[]) {
        this.db.get("albums")
            .find({name: albumName})
            .assign({songs: albumSongs})
            .write();
    }

    /**
     * Modifica el autor de la canción
     * @param songName Nombre de la canción
     * @param songAuthor Autor de la canción
     */
    modifyAuthorSong(songName: string, songAuthor: string) {
        this.db.get("songs")
            .find({name: songName})
            .assign({author: songAuthor})
            .write();
    }

    /**
     * Modifica la duración de la canción
     * @param songName Nombre de la canción
     * @param songDuration Duración de la canción
     */
    modifyDurationSong(songName: string, songDuration: number) {
        this.db.get("songs")
            .find({name: songName})
            .assign({duration: songDuration})
            .write();
    }

    /**
     * Modifica los géneros de la canción
     * @param songName Nombre de la canción
     * @param songGenres Géneros de la canción
     */
    modifyGenresSong(songName: string, songGenres: string[]) {
        this.db.get("songs")
            .find({name: songName})
            .assign({genres: songGenres})
            .write();
    }

    /**
     * Modifica el single de la canción
     * @param songName Nombre de la canción
     * @param songSingle Single
     */
    modifySingleSong(songName: string, songSingle: boolean) {
        this.db.get("songs")
            .find({name: songName})
            .assign({single: songSingle})
            .write();
    }

    /**
     * Modifica el número de reproducciones de la canción
     * @param songName Nombre de la canción
     * @param songNumberOfReproductions Número de reproducciones de la canción
     */
    modifyNumberReproductionsSong(songName: string, songNumberOfReproductions: number) {
        this.db.get("songs")
            .find({name: songName})
            .assign({numberReproductions: songNumberOfReproductions})
            .write();
    }

    /**
     * Función que devulve información de una canción
     * @returns Información de la canción
     */
    viewSong(songName: string): string {
        let show: string = "";
        let song = this.getSong(songName);

        show += "name: " + song?.name + "\n";
        show += "author: " + song?.author + "\n";
        show += "duration: " + song?.duration + "\n";
        show += "genres: " + song?.genres + "\n";
        show += "single: " + song?.single + "\n";
        show += "number of reproductions: " + song?.numberReproductions;
        return show;
    }

    /**
     * Función que devulve información de un género
     * @returns Información del género
     */
    viewGenre(genreName: string): string {
        let show: string = "";
        let genre = this.getGenre(genreName);
        show += "name: " + genre?.name + "\n";
        show += "authors: " + genre?.authors + "\n";
        show += "albums: " + genre?.albums + "\n";
        show += "songs: " + genre?.songs;
        return show;
    }

    /**
     * Función que devulve información de un album
     * @returns Información del album
     */
    viewAlbum(albumName: string): string {
        let show: string = "";
        let album = this.getAlbum(albumName);
        show += "name: " + album?.name + "\n";
        show += "author: " + album?.author + "\n";
        show += "year of publication:" + album?.yearPublication + "\n";
        show += "genres: " + album?.genres + "\n";
        show += "songs: " + album?.songs;
        return show;
    }

    /**
     * Función que devulve información de un grupo
     * @returns Información del grupo
     */
    viewGroup(groupName: string): string {
        let show: string = "";
        let group = this.getGroup(groupName);
        show += "name: " + group?.name + "\n";
        show += "artists: " + group?.artists + "\n";
        show += "year of creation: " + group?.yearCreation + "\n";
        show += "genres: " + group?.genres + "\n";
        show += "albums: " + group?.albums + "\n";
        show += "monthly listeners: " + group?.monthlyListeners;
        return show;
    }

    /**
     * Función que devulve información de un artista
     * @returns Información del artista
     */
    viewArtist(artistName: string): string {
        let show: string = "";
        let artist = this.getArtist(artistName);
        show += "name: " + artist?.name + "\n";
        show += "groups: " + artist?.groups + "\n";
        show += "genres: " + artist?.genres + "\n";
        show += "albums: " + artist?.albums + "\n";
        show += "songs: " + artist?.songs + "\n";
        show += "monthly listeners: " + artist?.monthlyListeners;
        return show;
    }
}
