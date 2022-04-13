import { Gestor } from './gestor';
import { DataBase } from './database';

let db = new DataBase();
let app = new Gestor(db);
app.promptUser();