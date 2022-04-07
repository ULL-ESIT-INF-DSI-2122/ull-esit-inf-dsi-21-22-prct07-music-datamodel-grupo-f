"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clases_1 = require("./clases");
const lowdb_1 = __importDefault(require("lowdb"));
const FileSync_1 = __importDefault(require("lowdb/adapters/FileSync"));
class DataBase {
    constructor() {
        const adapter = new FileSync_1.default("db.json");
        this.db = (0, lowdb_1.default)(adapter);
        this.initSongs();
    }
    initSongs() {
        if (!this.db.has("songs").value()) {
            this.db.set("songs", []).write();
        }
    }
    setSong(song) {
        this.db.get("songs").push(song).write();
    }
    getSong(nameSong) {
        return this.db.get("songs").find({ nCancion_: nameSong }).value();
    }
}
let c = new clases_1.Cancion("a", "a", 1, ["a"], true, 1);
let b = new DataBase();
b.setSong(c);
console.log(b.getSong("a") === c);
//# sourceMappingURL=database.js.map