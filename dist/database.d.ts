import { Genre, Album, Artist, Group, Playlist } from './classes';
export declare class DataBase {
    private db;
    constructor();
    private initGenres;
    private initAlbums;
    private initSongs;
    private initArtists;
    private initGroups;
    private initPlaylists;
    findSong(songName: string): number;
    findArtist(artistName: string): number;
    findGroup(groupName: string): number;
    findGenres(genres: string[]): number[];
    setSongToPlaylist(songName: string, playlistName: string): void;
    setPlaylist(playlist: Playlist): void;
    removePlaylist(playlistName: string): void;
    removeSongFromPlaylist(playlistName: string, nameSong: string): void;
    viewPlaylists(): void;
    viewPlaylist(playlistName: string): void;
    updateDurationPlaylist(playlistName: string): void;
    setArtist(artist: Artist): void;
    setGroup(group: Group): void;
    setGengre(genre: Genre): void;
    setAlbum(album: Album): void;
}
