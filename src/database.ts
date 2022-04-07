import { Biblioteca_musical, Cancion } from './clases'
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

interface SchemaInterface {
    songs: Cancion[],
}

class DataBase {
    private db: lowdb.LowdbSync<SchemaInterface>;

    constructor() {
        const adapter = new FileSync<SchemaInterface>("db.json");
        this.db = lowdb(adapter);
        this.initSongs();
    }

    private initSongs() {
        if(!this.db.has("songs").value()) {
            this.db.set("songs", []).write();
        }
    }

    setSong(song: Cancion) {
        this.db.get("songs").push(song).write();
    }

    getSong(nameSong: string): Cancion {
        return this.db.get("songs").find( {nCancion_: nameSong} ).value();
    }
}

let c: Cancion = new Cancion("a", "a", 1, ["a"], true, 1);
let b: DataBase = new DataBase();

b.setSong(c);
console.log(b.getSong("a") === c);