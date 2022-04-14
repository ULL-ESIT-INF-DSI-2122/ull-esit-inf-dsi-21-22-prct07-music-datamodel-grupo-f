import 'mocha';
import { expect } from 'chai';
import { Song, Genre, Artist, Group, Album } from '../src/classes';
import { DataBase} from '../src/database'

describe('Tests canciones', () => {
    let db: DataBase = new DataBase();
    let UnaNocheEnMedellin: Song = new Song("Una noche en Medellín", "Cris MJ", 2.33, ["Reggeaton"], true, 94290145);
    let Salsa: Genre = new Genre("Salsa", ["Frankie Ruiz", "Lalo Rodriguez", "Eddie Santiago"], [], ["Tu Con EL", "Lluvia", "Ven Devórame Otra Vez"]);
    let KISS: Group = new Group("KISS", ["Paul Stanley", "Gene Simmons", "Ace Frehley", "Eric Singer"], 1973, ["Rock"], [], 10236792);
    let ElAlfa: Artist = new Artist("El Alfa", [], ["Dembow"], [], ["La Mamá de la Mamá"], 20423564);
    let TheDaysNights: Album = new Album("The Days/Nights", "Avicii", 2014, ["Electrónica"], ["The Days", "The Nights"]);

    let songTest = new Song("songTest", "", 0, [], true, 0);
    let genreTest = new Genre("genreTest", [], [], []);
    let groupTest = new Group("groupTest", [], 0, [], [], 0);
    let artistTest = new Artist("artistTest", [], [],[], [], 0);
    let albumTest = new Album("albumTest", "", 0, [], []);

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

    it('finGroup test', () => {
      expect(db.findGroup(KISS.name)).to.be.equal(0);
    });

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
});
