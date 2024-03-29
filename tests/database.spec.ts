import 'mocha';
import { expect } from 'chai';
import { Song, Genre, Artist, Group, Album, Playlist } from '../src/classes';
import { DataBase} from '../src/database'

let db: DataBase = new DataBase("db.json");
let Salsa: Genre = db.getGenre("Salsa");
let LazySong: Song = db.getSong("Lazy song");
let NewsOfTheWorld: Album = db.getAlbum("News Of The World");
let ElAlfa: Artist = db.getArtist("El Alfa");
let OneDirection: Group = db.getGroup("One Direction");
let PlaylistN1: Playlist = db.getPlaylist("Playlist N1");

let songTest = new Song("songTest", "", 0, [], true, 0);
let genreTest = new Genre("genreTest", [], [], []);
let groupTest = new Group("groupTest", [], 0, [], [], 0);
let artistTest = new Artist("artistTest", [], [],[], [], 0);
let albumTest = new Album("albumTest", "", 0, [], []);
let playlistTest = new Playlist("playlistTest", [], 0, []);

let viewPlaysAux: string = "---LIST OF PLAYLISTS---\n" +
"\nPlaylist N1\n" +
"  Genres: [Reggeaton,K-pop,Pop,Flamenco,Bachata]\n" +
"  Duration: 0 hours and 21 minutes\n" +
"Fiesta\n" +
"  Genres: [Reggeaton,Dembow,Bachata]\n" +
"  Duration: 0 hours and 52 minutes\n" +
"Clásicos\n" +
"  Genres: [Jazz,Rock]\n" +
"  Duration: 0 hours and 26 minutes\n" +
"Éxitos Pop\n" +
"  Genres: [Pop,K-pop]\n" +
"  Duration: 0 hours and 52 minutes\n" +
"playlistTest\n" +
"  Genres: []\n" +
"  Duration: 0 hours and 4 minutes";

let viewPlayAux: string = "[Playlist N1] Duration: 0 hours and 21 minutes\n" +
"Buleria | David Bisbal | [4 min 11 sec]\n" +
" | [Pop,Flamenco] | Reprd. 17876247\n" +
"Llamado De Emergencia | Daddy Yankee | [3 min 58 sec]\n" +
" | [Reggeaton] | Reprd. 139069000\n" +
"Gasolina | Daddy Yankee | [3 min 12 sec]\n" +
" | [Reggeaton] | Reprd. 402472777\n" +
"MONEY | Lisa | [2 min 48 sec]\n" +
" | [K-pop] | Reprd. 430976789\n" +
"Volví | Aventura | [3 min 50 sec]\n" +
" | [Reggeaton,Bachata] | Reprd. 438178636\n" +
"Con Calma | Daddy Yankee | [3 min 12 sec]\n" +
" | [Reggeaton] | Reprd. 1071537617\n";

let viewSongAux: string = "name: Lazy song\n" +
"author: Bruno Mars\n" +
"duration: 3.09\n" +
"genres: Pop\n" +
"single: true\n" +
"number of reproductions: 579789618";

let viewGenreAux: string = "name: Salsa\n" +
"authors: Frankie Ruiz,Lalo Rodríguez,Eddie Santiago\n" +
"albums: \n" +
"songs: Tú Con Él,Ven Devórame Otra Vez,Que Locura Enamorarme De Ti";

let viewAlbumAux: string = "name: News Of The World\n" +
"author: Queen\n" +
"year of publication:1977\n" +
"genres: Rock\n" +
"songs: We Are The Champions,We Will Rock You";

let viewGroupAux: string = "name: One Direction\n" +
"artists: Harry Styles,Niall Horan,Liam Payne,Zayn Malik\n" +
"year of creation: 2010\n" +
"genres: Pop\n" +
"albums: Up All Night\n" +
"monthly listeners: 28259221";

let viewArtistAux: string = "name: El Alfa\n" +
"groups: \n" +
"genres: Dembow,Trap,Reggeaton\n" +
"albums: \n" +
"songs: La mamá de la Mamá,La Romana,Acuetate,Singapour,4K\n" +
"monthly listeners: 15824273";

describe("Tests clase Database - Métodos Find", () => {

  it('findSong test', () => {
    expect(db.findSong(LazySong.name)).to.be.equal(0);
  });

  it('findAlbum test', () => {
    expect(db.findAlbum(NewsOfTheWorld.name)).to.be.equal(0);
  });

  it('findGenre test', () => {
    expect(db.findGenre(Salsa.name)).to.be.equal(3);
  });

  it('findArtist test', () => {
    expect(db.findArtist(ElAlfa.name)).to.be.equal(12);
  });

  it('findGroup test', () => {
    expect(db.findGroup(OneDirection.name)).to.be.equal(4);
  });

  it('findPlaylist test', () => {
    expect(db.findPlaylist(PlaylistN1.name)).to.be.equal(0);
  })
  
});

describe("Tests clase Database - Métodos Sort", () => {
  it('alphabeticalSongNameSort test', () => {
    db.alphabeticalSongNameSort(PlaylistN1.name);
    expect(db.getPlaylist(PlaylistN1.name).songs).to.be.eql(["Buleria", "Con Calma", "Gasolina", "Llamado De Emergencia", "MONEY", "Volví"]);
  });

  it('alphabeticalAuthorNameSort test', () => {
    db.alphabeticalAuthorNameSort(PlaylistN1.name);
    expect(db.getPlaylist(PlaylistN1.name).songs).to.be.eql(["Volví", "Con Calma", "Gasolina", "Llamado De Emergencia", "Buleria", "MONEY"]);
  });

  it('durationSort test', () => {
    db.durationSort(PlaylistN1.name);
    expect(db.getPlaylist(PlaylistN1.name).songs).to.be.eql(["MONEY", "Gasolina", "Con Calma", "Volví", "Llamado De Emergencia", "Buleria"]);
  });

  it('genreSort test', () => {
    db.genreSort("Reggeaton", PlaylistN1.name);
    expect(db.getPlaylist(PlaylistN1.name).songs).to.be.eql(["Gasolina", "Con Calma", "Volví", "Llamado De Emergencia", "MONEY", "Buleria"]);
  });

  it('numberOfReproductionSort test', () => {
    db.numberOfReproductionSort(PlaylistN1.name);
    expect(db.getPlaylist(PlaylistN1.name).songs).to.be.eql(["Buleria", "Llamado De Emergencia", "Gasolina", "MONEY", "Volví", "Con Calma"]);
  });
});

describe("Tests clase Database - Métodos Getter", () => {
  
  it('getSong test', () => {
    expect(db.getSong(LazySong.name)).to.be.eql(LazySong);
  });

  it('getAlbum', () => {
    expect(db.getAlbum(NewsOfTheWorld.name)).to.be.eql(NewsOfTheWorld);
  });

  it('getGenre test', () => {
    expect(db.getGenre(Salsa.name)).to.be.eql(Salsa);
  });

  it('getArtist test', () => {
    expect(db.getArtist(ElAlfa.name)).to.be.eql(ElAlfa);
  });

  it('getGroup test', () => {
    expect(db.getGroup(OneDirection.name)).to.be.eql(OneDirection);
  });

  it('getPlaylist test', () => {
    expect(db.getPlaylist(PlaylistN1.name)).to.be.eql(PlaylistN1);
  });

  it('getAlbumWithSong test', () => {
    expect(db.getAlbumWithSong("The Days")).to.be.eql("The Days/Nights");
    expect(db.getAlbumWithSong("Unexisting Playlist")).to.be.equal("");
  });

  it('getSongsOfAuthor test', () => {
    expect(db.getSongsOfAuthor("Harry Styles")).to.be.eql(["Watermelon Sugar"]);
  });
})

describe("Tests clase Database - Métodos Setters", () => {
  it('setSong test', () => {
    db.setSong(songTest);
    expect(db.findSong(songTest.name)).to.be.not.equal(-1);
  });

  it('setAlbum test', () => {
    db.setAlbum(albumTest);
    expect(db.findAlbum(albumTest.name)).to.be.not.equal(-1);
  });

  it('setGenre test', () => {
    db.setGenre(genreTest);
    expect(db.findGenre(genreTest.name)).to.be.not.equal(-1);
  });

  it('setArtist test', () => {
    db.setArtist(artistTest);
    expect(db.findArtist(artistTest.name)).to.be.not.equal(-1);
  });

  it('setGroup test', () => {
    db.setGroup(groupTest);
    expect(db.findGroup(groupTest.name)).to.be.not.equal(-1);
  });

  it('setPlaylist test', () => {
    db.setPlaylist(playlistTest);
    expect(db.findPlaylist(playlistTest.name)).to.be.not.equal(-1);
  });

  it('setSongToPlaylist test', () => {
    db.setSongToPlaylist("cancion845", playlistTest.name);
    expect(db.getPlaylist(playlistTest.name).songs).to.be.eql(["cancion845"]);
  });
})

describe("Tests clase Database - Métodos Modify", () => {
  it('modifyAuthorsGenre test', () => {
    db.modifyAuthorsGenre(genreTest.name, ["autor1", "autor199"]);
        expect(db.getGenre(genreTest.name).authors).to.be.eql(["autor1", "autor199"]);
  });

  it('modifyAlbumsGenre test', () => {
    db.modifyAlbumsGenre(genreTest.name, ["album1", "album13"]);
    expect(db.getGenre(genreTest.name).albums).to.be.eql(["album1", "album13"]);
  });

  it('modifySongsGenre test', () => {
    db.modifySongsGenre(genreTest.name, ["cancion11", "cancion00"]);
    expect(db.getGenre(genreTest.name).songs).to.be.eql(["cancion11", "cancion00"]);
  });

  it('modifyAuthorSong test', () => {
    db.modifyAuthorSong(songTest.name, "test");
    expect(db.getSong(songTest.name).author).to.be.equal("test");
  });

  it('modifyDurationSong test', () => {
    db.modifyDurationSong(songTest.name, 1);
    expect(db.getSong(songTest.name).duration).to.be.equal(1);
  });

  it('modifyGenresSong test', () => {
    db.modifyGenresSong(songTest.name, ["test"]);
    expect(db.getSong(songTest.name).genres).to.be.eql(["test"]);
  });

  it('modifySingleSong test', () => {
    db.modifySingleSong(songTest.name, false);
    expect(db.getSong(songTest.name).single).to.be.false;
  });

  it('modifyNumberReproductionsSong test', () => {
    db.modifyNumberReproductionsSong(songTest.name, 99);
    expect(db.getSong(songTest.name).numberReproductions).to.be.equal(99);
  });

  it('modifyAuthorAlbum test', () => {
    db.modifyAuthorAlbum(albumTest.name, "test");
    expect(db.getAlbum(albumTest.name).author).to.be.equal("test");
  });
    
  it('modifyYearPublicationAlbum test', () => {
    db.modifyYearPublicationAlbum(albumTest.name, 1900);
    expect(db.getAlbum(albumTest.name).yearPublication).to.be.equal(1900);
  });

  it('modifyGenresAlbum test', () => {
    db.modifyGenresAlbum(albumTest.name, ["regue", "funk"]);
    expect(db.getAlbum(albumTest.name).genres).to.be.eql(["regue", "funk"]);
  });

  it('modifySongsAlbum test', () => {
    db.modifySongsAlbum(albumTest.name, ["si", "no"]);
    expect(db.getAlbum(albumTest.name).songs).to.be.eql(["si", "no"]);
  });

  it('modifyGroupsArtist test', () => {
    db.modifyGroupsArtist(artistTest.name, ["grupo1", "grupo2"]);
    expect(db.getArtist(artistTest.name).groups).to.be.eql(["grupo1", "grupo2"]);
  });

  it('modifyGenresArtist test', () => {
    db.modifyGenresArtist(artistTest.name, ["genero1", "genero2"]);
    expect(db.getArtist(artistTest.name).genres).to.be.eql(["genero1", "genero2"]);
  });

  it('modifyAlbumsArtist test', () => {
    db.modifyAlbumsArtist(artistTest.name, ["album1", "album2"]);
    expect(db.getArtist(artistTest.name).albums).to.be.eql(["album1", "album2"]);
  });

  it('modifySongsArtist test', () => {
    db.modifySongsArtist(artistTest.name, ["cancion1, cancion2"]);
    expect(db.getArtist(artistTest.name).songs).to.be.eql(["cancion1, cancion2"]);
  });

  it('modifyMonthlyListenersArtist test', () => {
    db.modifyMonthlyListenersArtist(artistTest.name, 400);
    expect(db.getArtist(artistTest.name).monthlyListeners).to.be.equal(400);
  });

  it('modifyArtistsGroup test', () => {
    db.modifyArtistsGroup(groupTest.name, ["artista1"]);
    expect(db.getGroup(groupTest.name).artists).to.be.eql(["artista1"]);
  });

  it('modifyYearCreationGroup test', () => {
    db.modifyYearCreationGroup(groupTest.name, 200);
    expect(db.getGroup(groupTest.name).yearCreation).to.be.equal(200);
  });

  it('modifyGenresGroup test', () => {
    db.modifyGenresGroup(groupTest.name, ["genero1", "genero2"]);
    expect(db.getGroup(groupTest.name).genres).to.be.eql(["genero1", "genero2"]);
  });

  it('modifyAlbumsGroup test', () => {
    db.modifyAlbumsGroup(groupTest.name, ["album1", "album3"]);
    expect(db.getGroup(groupTest.name).albums).to.be.eql(["album1", "album3"]);
  });

  it('modifyMonthlyListenersGroup test', () => {
    db.modifyMonthlyListenersGroup(groupTest.name, 69);
    expect(db.getGroup(groupTest.name).monthlyListeners).to.be.equal(69);
  });

  it('changeOwnerOfPlaylist test', () => {
    db.changeOwnerOfPlaylist("Playlist N1", "user")
    expect(db.getPlaylist("Playlist N1").owner).to.be.equal("user");
  });

  it('updateDurationPlaylist test', () => {
    db.setSongToPlaylist(LazySong.name, playlistTest.name);
    db.updateDurationPlaylist(playlistTest.name);
    expect(playlistTest.duration).to.be.equal(0.04);
  });
});

describe("Tests clase Database - Métodos View", () => {
  it('viewPlaylist test', () => {
    expect(db.viewPlaylists()).to.be.equal(viewPlaysAux);
    expect(db.viewPlaylist("Playlist N1")).to.be.equal(viewPlayAux)
    expect(db.viewPlaylist("unexisting Playlist")).to.be.equal("ERROR: Playlist not found");
  });

  it('viewSong test', () => {
    expect(db.viewSong("Lazy song")).to.be.equal(viewSongAux);
  });

  it('viewGenre test', () => {
    expect(db.viewGenre("Salsa")).to.be.equal(viewGenreAux);
  });

  it('viewAlbum test', () => {
    expect(db.viewAlbum("News Of The World")).to.be.equal(viewAlbumAux);
  });

  it('viewGroup test', () => {
    expect(db.viewGroup("One Direction")).to.be.equal(viewGroupAux);
  });

  it('viewArtist test', () => {
    expect(db.viewArtist("El Alfa")).to.be.equal(viewArtistAux);
  });
})

describe("Tests clase Database - Métodos Remove", () => {
  it('removeSong test', () => {
    db.removeSong(songTest.name);
    expect(db.findSong(songTest.name)).to.be.equal(-1);
  });

  it('removeAlbum test', () => {
    db.removeAlbum(albumTest.name);
    expect(db.findAlbum(albumTest.name)).to.be.equal(-1);
  });

  it('removeGenre test', () => {
    db.removeGenre(genreTest.name);
    expect(db.findGenre(genreTest.name)).to.be.equal(-1);
  });

  it('removeArtist test', () => {
    db.removeArtist(artistTest.name);
    expect(db.findArtist(artistTest.name)).to.be.equal(-1);
  });

  it('removeGroup test', () => {
    db.removeGroup(groupTest.name);
    expect(db.findGroup(groupTest.name)).to.be.equal(-1);
  });

  it('removeSongFromPlaylist test', () => {
    db.removeSongFromPlaylist(playlistTest.name, "cancion845");
    expect(db.getPlaylist(playlistTest.name).songs).to.be.eql(["Lazy song"]);
  });

  it('removePlaylist test', () => {
    db.removePlaylist(playlistTest.name);
    expect(db.findPlaylist(playlistTest.name)).to.be.equal(-1);
  });
  
});

describe("Tests clase Database - Métodos Formatter", () => {
  it('getFormattedDurationPlaylist test', () => {
    expect(db.getFormattedDurationPlaylist(PlaylistN1)).to.be.equal("Duration: 0 hours and 21 minutes");
  });
  
  let PlayUnd: Playlist;
  
  it('getFormattedDurationPlaylist undefined test', () => {
    expect(db.getFormattedDurationPlaylist(PlayUnd)).to.be.equal("ERROR: The playlist was not located to calculate its duration");
  });
  
  it('getFormattedDurationSong test', () => {
    expect(db.getFormattedDurationSong(LazySong)).to.be.equal("[3 min 8 sec]");
  });

  let SongUnd: Song;

  it('getFormattedDurationSong test', () => {
    expect(db.getFormattedDurationSong(SongUnd)).to.be.equal("ERROR: The song was not located to calculate its duration");
  });
})