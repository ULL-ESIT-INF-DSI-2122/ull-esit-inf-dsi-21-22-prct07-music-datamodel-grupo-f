import 'mocha';
import { expect } from 'chai';
import { Song, Genre, Artist, Group, Album, Playlist } from '../src/classes';

let UnaNocheEnMedellin: Song = new Song("Una noche en Medellín", "Cris MJ", 2.33, ["Reggeaton"], true, 94290145);
let Salsa: Genre = new Genre("Salsa", ["Frankie Ruiz", "Lalo Rodriguez", "Eddie Santiago"], [], ["Tu Con EL", "Lluvia", "Ven Devórame Otra Vez"]);
let KISS: Group = new Group("KISS", ["Paul Stanley", "Gene Simmons", "Ace Frehley", "Eric Singer"], 1973, ["Rock"], [], 10236792);
let ElAlfa: Artist = new Artist("El Alfa", [], ["Dembow"], [], ["La Mamá de la Mamá"], 20423564);
let TheDaysNights: Album = new Album("The Days/Nights", "Avicii", 2014, ["Electrónica"], ["The Days", "The Nights"]);
let ExitosAvicii: Playlist = new Playlist("Éxitos de Avicii", ["The Days", "The Nights", "Wake Me Up"], 11.41, ["Electrónica"]);

describe("Tests de clases Genre, Album, Song, Group, Artist y Playlist", () => {

    it('Atributos de la clase Genre instanciados correctamente', () => {
        expect(Salsa.albums).to.be.eql([]);
        expect(Salsa.authors).to.be.eql(["Frankie Ruiz", "Lalo Rodriguez", "Eddie Santiago"]);
        expect(Salsa.name).to.be.equal("Salsa");
        expect(Salsa.songs).to.be.eql(["Tu Con EL", "Lluvia", "Ven Devórame Otra Vez"]);
    });

    it('Atributos de la clase Song instanciados correctamente', () => {
        expect(UnaNocheEnMedellin.author).to.be.equal("Cris MJ");
        expect(UnaNocheEnMedellin.duration).to.be.equal(2.33);
        expect(UnaNocheEnMedellin.genres).to.be.eql(["Reggeaton"]);
        expect(UnaNocheEnMedellin.name).to.be.equal("Una noche en Medellín");
        expect(UnaNocheEnMedellin.numberReproductions).to.be.equal(94290145);
        expect(UnaNocheEnMedellin.single).to.be.equal(true);
    });

    it('Atributos de la clase Album instanciados correctamente', () => {
        expect(TheDaysNights.author).to.be.equal("Avicii");
        expect(TheDaysNights.genres).to.be.eql(["Electrónica"]);
        expect(TheDaysNights.name).to.be.eql("The Days/Nights");
        expect(TheDaysNights.songs).to.be.eql(["The Days", "The Nights"]);
        expect(TheDaysNights.yearPublication).to.be.equal(2014);
    });


    it('Atributos de la clase Group instanciados correctamente', () => {
        expect(KISS.albums).to.be.eql([]);
        expect(KISS.artists).to.be.eql(["Paul Stanley", "Gene Simmons", "Ace Frehley", "Eric Singer"]);
        expect(KISS.genres).to.be.eql(["Rock"]);
        expect(KISS.monthlyListeners).to.be.equal(10236792);
        expect(KISS.name).to.be.equal("KISS");
        expect(KISS.yearCreation).to.be.equal(1973);
    });

    it('Atributos de la clase Group instanciados correctamente', () => {
        expect(ElAlfa.albums).to.be.eql([]);
        expect(ElAlfa.genres).to.be.eql(["Dembow"]);
        expect(ElAlfa.groups).to.be.eql([]);
        expect(ElAlfa.monthlyListeners).to.be.equal(20423564);
        expect(ElAlfa.name).to.be.eql("El Alfa");
        expect(ElAlfa.songs).to.be.eql(["La Mamá de la Mamá"]);
    });

    it('Atributos de la clase Playlist instanciados correctamente', () => {
        expect(ExitosAvicii.duration).to.be.equal(11.41);
        expect(ExitosAvicii.genres).to.be.eql(["Electrónica"]);
        expect(ExitosAvicii.name).to.be.equal("Éxitos de Avicii");
        expect(ExitosAvicii.songs).to.be.eql(["The Days", "The Nights", "Wake Me Up"]);
    });
    
})
