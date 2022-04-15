import 'mocha';
import { expect } from 'chai';
import { Song, Genre, Artist, Group, Album, Playlist } from '../src/classes';
import { DataBase} from '../src/database'

let db: DataBase = new DataBase("db copy.json");
let UnaNocheEnMedellin: Song = db.getSong("Una noche en Medellín");
let Salsa: Genre = db.getGenre("Salsa");
let KISS: Group = db.getGroup("KISS");
let ElAlfa: Artist = db.getArtist("El Alfa");
let TheDaysNights: Album = db.getAlbum("The Days/Nights");
let PlaylistN1: Playlist = db.getPlaylist("Playlist N1");

let songTest = new Song("songTest", "", 0, [], true, 0);
let genreTest = new Genre("genreTest", [], [], []);
let groupTest = new Group("groupTest", [], 0, [], [], 0);
let artistTest = new Artist("artistTest", [], [],[], [], 0);
let albumTest = new Album("albumTest", "", 0, [], []);
let playlistTest = new Playlist("playlistTest", [], 0, []);

let viewPlaysAux: string = "---LIST OF PLAYLISTS---\n" +
"\nPlaylist N1\n" +
"  Genres: [Merengue,Salsa,Reggeaton,Bachata]\n" +
"  Duration: 0 hours and 28 minutes" +
"\nT1\n" +
"  Genres: [Reggeaton,Bachata,Merengue,Salsa]\n" +
"  Duration: 0 hours and 20 minutes" +
"\nplaylistTest\n" +
"  Genres: []\n" +
"  Duration: 0 hours and 0 minutes";

let viewPlayAux: string = "[Playlist N1] Duration: 0 hours and 28 minutes\n" +
"La Morena | Oro Solido | [4 min 48 sec]\n" +
" | [Merengue] | Reprd. 3789640\n" +
"La Vaca | Mala Fe | [4 min 15 sec]\n" +
" | [Merengue] | Reprd. 30911303\n" +
"Lluvia | Eddie Santiago | [4 min 55 sec]\n" +
" | [Salsa] | Reprd. 87247709\n" +
"Una noche en Medellín | Cris MJ | [2 min 33 sec]\n" +
" | [Reggeaton] | Reprd. 94290145\n" +
"Obsesion | Aventura | [4 min 13 sec]\n" +
" | [Bachata] | Reprd. 280599715\n" +
"EL MAKINON | KAROL G | [3 min 29 sec]\n" +
" | [Reggeaton] | Reprd. 335382390\n" +
"Volví | Aventura | [3 min 50 sec]\n" +
" | [Reggeaton] | Reprd. 433326208\n";

let viewSongAux: string = "name: Touch Too Much\n" +
"author: AC/DC\n" +
"duration: 4.26\n" +
"genres: Rock\n" +
"single: false\n" +
"number of reproductions: 51817548";

let viewGenreAux: string = "name: Merengue\n" +
"authors: Toño Rosario,Los Hermanos Rosario,Oro Solido,Mala Fe\n" +
"albums: \n" +
"songs: Kiliki Taka Ti,La Dueña del Swing,Abusadora,La Morena,La Vaca";

let viewAlbumAux: string = "name: Highway to Hell\n" +
"author: AC/DC\n" +
"year of publication:1979\n" +
"genres: Rock\n" +
"songs: Highway to Hell,If You Want Blood (You've Got It),Touch Too Much";

let viewGroupAux: string = "name: KISS\n" +
"artists: Paul Stanley,Gene Simmons,Ace Frehley,Eric Singer\n" +
"year of creation: 1973\n" +
"genres: Rock\n" +
"albums: \n" +
"monthly listeners: 10236792";

let viewArtistAux: string = "name: Pablo Alborán\n" +
"groups: \n" +
"genres: Pop,Bachata\n" +
"albums: \n" +
"songs: \n" +
"monthly listeners: 2846772345";

describe("Tests clase Database - Métodos Find", () => {

  it('findSong test', () => {
    expect(db.findSong(UnaNocheEnMedellin.name)).to.be.equal(0);
  });

  it('findAlbum test', () => {
    expect(db.findAlbum(TheDaysNights.name)).to.be.equal(0);
  });

  it('findGenre test', () => {
    expect(db.findGenre(Salsa.name)).to.be.equal(1);
  });

  it('findArtist test', () => {
    expect(db.findArtist(ElAlfa.name)).to.be.equal(1);
  });

  it('findGroup test', () => {
    expect(db.findGroup(KISS.name)).to.be.equal(0);
  });

  it('findPlaylist test', () => {
      expect(db.findPlaylist(PlaylistN1.name)).to.be.equal(0);
  })
  
});

describe("Tests clase Database - Métodos Sort", () => {
  it('alphabeticalSongNameSort test', () => {
      db.alphabeticalSongNameSort(PlaylistN1.name);
      expect(db.getPlaylist(PlaylistN1.name).songs).to.be.eql(["EL MAKINON", "La Morena", "La Vaca", "Lluvia", "Obsesion", "Una noche en Medellín", "Volví"]);
  });

  it('alphabeticalAuthorNameSort test', () => {
      db.alphabeticalAuthorNameSort(PlaylistN1.name);
      expect(db.getPlaylist(PlaylistN1.name).songs).to.be.eql(["Obsesion", "Volví", "Una noche en Medellín", "Lluvia", "EL MAKINON", "La Vaca", "La Morena"]);
  });

  it('durationSort test', () => {
      db.durationSort(PlaylistN1.name);
      expect(db.getPlaylist(PlaylistN1.name).songs).to.be.eql(["Una noche en Medellín", "EL MAKINON", "Volví", "Obsesion", "La Vaca", "La Morena", "Lluvia"]);
  });

  it('genreSort test', () => {
    db.genreSort("Reggeaton", PlaylistN1.name);
    expect(db.getPlaylist(PlaylistN1.name).songs).to.be.eql(["Una noche en Medellín", "EL MAKINON", "Volví", "Obsesion", "La Vaca", "La Morena", "Lluvia"]);
  });

  it('numberOfReproductionSort test', () => {
      db.numberOfReproductionSort(PlaylistN1.name);
      expect(db.getPlaylist(PlaylistN1.name).songs).to.be.eql(["La Morena", "La Vaca", "Lluvia", "Una noche en Medellín", "Obsesion", "EL MAKINON", "Volví"]);
  });
});

describe("Tests clase Database - Métodos Getter", () => {
  
  it('getSong test', () => {
    expect(db.getSong(UnaNocheEnMedellin.name)).to.be.eql(UnaNocheEnMedellin);
  });

  it('getAlbum', () => {
    expect(db.getAlbum(TheDaysNights.name)).to.be.eql(TheDaysNights);
  });

  it('getGenre test', () => {
    expect(db.getGenre(Salsa.name)).to.be.eql(Salsa);
  });

  it('getArtist test', () => {
    expect(db.getArtist(ElAlfa.name)).to.be.eql(ElAlfa);
  });

  it('getGroup test', () => {
    expect(db.getGroup(KISS.name)).to.be.eql(KISS);
  });

  it('getPlaylist test', () => {
    expect(db.getPlaylist(PlaylistN1.name)).to.be.eql(PlaylistN1);
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
    })
});

describe("Tests clase Database - Métodos View", () => {
    it('viewPlaylist test', () => {
        expect(db.viewPlaylists()).to.be.equal(viewPlaysAux);
        expect(db.viewPlaylist("Playlist N1")).to.be.equal(viewPlayAux)
        expect(db.viewPlaylist("unexisting Playlist")).to.be.equal("ERROR: Playlist not found");
    });

    it('viewSong test', () => {
        expect(db.viewSong("Touch Too Much")).to.be.equal(viewSongAux);
    });

    it('viewGenre test', () => {
        expect(db.viewGenre("Merengue")).to.be.equal(viewGenreAux);
    });

    it('viewAlbum test', () => {
        expect(db.viewAlbum("Highway to Hell")).to.be.equal(viewAlbumAux);
    });

    it('viewGroup test', () => {
        expect(db.viewGroup("KISS")).to.be.equal(viewGroupAux);
    });

    it('viewArtist test', () => {
        expect(db.viewArtist("Pablo Alborán")).to.be.equal(viewArtistAux);
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
    expect(db.getPlaylist(playlistTest.name).songs).to.be.eql([]);
  });

  it('removePlaylist test', () => {
    db.removePlaylist(playlistTest.name);
    expect(db.findPlaylist(playlistTest.name)).to.be.equal(-1);
  });
  
});

describe("Tests clase Database - Métodos Formatter", () => {
  it('getFormattedDurationPlaylist test', () => {
    expect(db.getFormattedDurationPlaylist(PlaylistN1)).to.be.equal("Duration: 0 hours and 28 minutes");
  });
  
  let PlayUnd: Playlist;
  
  it('getFormattedDurationPlaylist undefined test', () => {
    expect(db.getFormattedDurationPlaylist(PlayUnd)).to.be.equal("ERROR: The playlist was not located to calculate its duration");
  });
  
  it('getFormattedDurationSong test', () => {
    expect(db.getFormattedDurationSong(UnaNocheEnMedellin)).to.be.equal("[2 min 33 sec]");
  });

  let SongUnd: Song;

  it('getFormattedDurationSong test', () => {
    expect(db.getFormattedDurationSong(SongUnd)).to.be.equal("ERROR: The song was not located to calculate its duration");
  });
})