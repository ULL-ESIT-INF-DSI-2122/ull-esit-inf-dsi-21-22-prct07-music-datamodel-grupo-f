import 'mocha';
import { expect } from 'chai';
import { Song, Genre, Artist, Group } from '../src/classes';
import { DataBase} from '../src/database'

describe('Tests canciones', () => {
    let db: DataBase = new DataBase();
    let UnaNocheEnMedellin: Song = new Song(
        "Una noche en Medellín",
        "Cris MJ",
        2.33,
        [
          "Reggeaton"
        ],
        true,
        94290145
    );

    let Salsa: Genre = new Genre(
        "Salsa",
        [
          "Frankie Ruiz",
          "Lalo Rodriguez",
          "Eddie Santiago"
        ],
        [],
        [
          "Tu Con EL",
          "Lluvia",
          "Ven Devórame Otra Vez"
        ]
    );

    let KISS: Group = new Group(
        "KISS",
        [
            "Paul Stanley",
            "Gene Simmons",
            "Ace Frehley",
            "Eric Singer"
          ],
        1973,
        [
          "Rock"
        ],
        [],
        10236792
    );

    let ElAlfa: Artist = new Artist(
        "El Alfa",
        [],
        [
          "Dembow"
        ],
        [],
        [
          "La Mamá de la Mamá"
        ],
        20423564
    );

    it('findSong test', () => {
        expect(db.findSong(UnaNocheEnMedellin.name)).to.be.equal(0);
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
    })

    it('getGenre test', () => {
        expect(db.getGenre(Salsa.name)).to.be.eql(Salsa);
    });

    it('getArtist test', () => {
        expect(db.getArtist(ElAlfa.name)).to.be.eql(ElAlfa);
    });

    it('getGroup test', () => {
        expect(db.getGroup(KISS.name)).to.be.eql(KISS);
    });

    it('removeSong test', () => {});

    it('removeGenre test', () => {});

    it('removeArtist test', () => {});

    it('removeGroup test', () => {});
});
