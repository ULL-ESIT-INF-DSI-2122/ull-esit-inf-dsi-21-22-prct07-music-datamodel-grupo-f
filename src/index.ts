import { Gestor } from './prompt';
import { DataBase} from './database';

let db = new DataBase();
let app = new Gestor(db);
app.promptUser();