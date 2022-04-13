"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gestor_1 = require("./gestor");
const database_1 = require("./database");
let db = new database_1.DataBase();
let app = new gestor_1.Gestor(db);
app.promptUser();
//# sourceMappingURL=index.js.map