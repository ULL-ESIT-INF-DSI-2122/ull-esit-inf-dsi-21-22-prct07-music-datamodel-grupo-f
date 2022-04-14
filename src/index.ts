import { Gestor } from './gestor';
import { DataBase } from './database';
import { DataBaseManipulator } from './prompt'
import inquirer from 'inquirer';

let db = new DataBase();
let app = new DataBaseManipulator(db);
app.promptUser();