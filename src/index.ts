import { Gestor } from './gestor';
import { DataBase } from './database';
import { DataBaseManipulator } from './prompt'
import inquirer from 'inquirer';

let db: DataBase = new DataBase("db copy.json");
let app1: DataBaseManipulator = new DataBaseManipulator(db);
let app2: Gestor = new Gestor(db);

enum IndexCommands {
    Gestor = "Gestor",
    DataBaseManipulator = "DataBaseMinupaltor",
    Quit = "Quit",
}

async function main() {
    console.clear();
    const answers = await inquirer.prompt({
        type: "list",
        name: "command",
        message: "Choose option",
        choices: Object.values(IndexCommands)
    });

    switch(answers["command"]) {
        case IndexCommands.DataBaseManipulator:
            await app1.promptUser();
            break;
        case IndexCommands.Gestor:
            await app2.promptUser();
            break;
        case IndexCommands.Quit:
            break;
    }
}

main();