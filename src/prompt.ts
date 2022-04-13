import inquirer from 'inquirer';
import { Genre, Album, Song, Artist, Group, Playlist, Property } from './classes';
import { DataBase } from './database';

/**
 * Comandos del menú principal
 */
enum Commands {
    AddInformation = "Add new information to DataBase",
    RemoveInformation = "Remove information from DataBase",
    ModifyInformation = "Modify information from DataBase",
    VizualizeInformation = "Visualize information about the author",
    Quit = "Quit",
}

/**
 * Comandos para añadir información
 */
enum CommandsAdd {
    AddGenre = "Add a new genre",
    AddArtist = "Add a new artist",
    AddGroup = "Add a new group",
    AddSong = "Add a new song",
    AddAlbum = "Add a new album",
    Quit = "Quit",
}

/**
 * Comandos para eliminar información
 */
 enum CommandsRemove {
  RemoveGenre = "Remove a genre",
  RemoveArtist = "Remove an artist",
  RemoveGroup = "Remove a group",
  RemoveSong = "Remove a song",
  RemoveAlbum = "Remove an album",
  Quit = "Quit",
}

/**
 * Comandos para modificar información
 */
 enum CommandsModify {
  ModifyGenre = "Modify a genre",
  ModifyArtist = "Modify an artist",
  ModifyGroup = "Modify a group",
  ModifySong = "Modify a song",
  ModifyAlbum = "Modify an album",
  Quit = "Quit",
}

/**
 * Comandos para visualizar, ordenar y filtrar información
 */
 enum CommandsVisualizer {
  AlphabeticalSongNameSort = "Sort by song name",
  AlphabeticalAlbumNameSort = "Sort by album name",
  NumberOfReproductionSort = "Sort by number of reproductions",
  Quit = "Quit",
}

/**
 * Pausa la ejecución los segundos introducidos
 * @param ms Milisegundos de tiempo de espera
 * @returns 
 */
 function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
} 

export class DataBaseManipulator {
    constructor(private database: DataBase) {}

    /**
     * Imprime un mensaje con un tiempo de delay
     * @param message El mensaje a imprimir
     */
        async showMessage(message: string) {
        console.log(message);
        await sleep(4500);
    }

    /**
     * Menú principal donde se podrán ejecutar los comandos
     */
    async promptUser(): Promise<void> {
        let answers = {
            command: Commands.AddInformation,
        }
    
        while(answers["command"] != Commands.Quit) {
            console.clear();
            console.log("--- DATABASE MANIPULATOR ---");
            console.log("--- Main Menu ---");
            answers = await inquirer.prompt({
                type: "list",
                name: "command",
                message: "Choose option",
                choices: Object.values(Commands)
            });
    
            switch(answers["command"]) {
                case Commands.AddInformation:
                    await this.promptAddInformation();
                    break;
                case Commands.RemoveInformation:
                    await this.promptRemoveInformation();
                    break;
                case Commands.ModifyInformation:
                    await this.promptModifyInformation();
                    break;
                case Commands.VizualizeInformation:
                    // Añadir visualizador
                    break;
            }
        }
    } 
    
    async promptAddInformation(): Promise<void> {
        let answers = {
            command: CommandsAdd.AddGenre,
        }
    
        while(answers["command"] != CommandsAdd.Quit) {
            console.clear();
            console.log("--- DATABASE MANIPULATOR ---");
            console.log("--- Add Information ---");
            answers = await inquirer.prompt({
                type: "list",
                name: "command",
                message: "Choose option",
                choices: Object.values(CommandsAdd)
            });
    
            switch(answers["command"]) {
                case CommandsAdd.AddGenre:
                    await this.funcAddGenre();
                    break;
                case CommandsAdd.AddArtist:
                    await this.promptAddPlaylistFromScratch();
                    break;
                case CommandsAdd.AddGroup:
                    await this.promptAddPlaylistFromExistingOne();
                    break;
                case CommandsAdd.AddSong:
                    await this.promptRemovePlaylist();
                    break;
                case CommandsAdd.AddAlbum:
                    await this.promptRemovePlaylist();
                    break;
            }
        }
    }

    async promptRemoveInformation(): Promise<void> {
        let answers = {
            command: CommandsRemove.RemoveGenre,
        }
    
        while(answers["command"] != CommandsRemove.Quit) {
            console.clear();
            console.log("--- DATABASE MANIPULATOR ---");
            console.log("--- Remove Information ---");
            answers = await inquirer.prompt({
                type: "list",
                name: "command",
                message: "Choose option",
                choices: Object.values(CommandsRemove)
            });
    
            switch(answers["command"]) {
                case CommandsRemove.RemoveGenre:
                    await this.promptRemoveInformation();
                    break;
                case CommandsRemove.RemoveArtist:
                    await this.promptRemovePlaylistFromScratch();
                    break;
                case CommandsRemove.RemoveGroup:
                    await this.promptRemovePlaylistFromExistingOne();
                    break;
                case CommandsRemove.RemoveSong:
                    await this.promptRemovePlaylist();
                    break;
                case CommandsRemove.RemoveAlbum:
                    await this.promptRemovePlaylist();
                    break;
            }
        }
    }

    async promptModifyInformation(): Promise<void> {
        let answers = {
            command: CommandsModify.ModifyGenre,
        }
    
        while(answers["command"] != CommandsModify.Quit) {
            console.clear();
            console.log("--- DATABASE MANIPULATOR ---");
            console.log("--- Modify Information ---");
            answers = await inquirer.prompt({
                type: "list",
                name: "command",
                message: "Choose option",
                choices: Object.values(CommandsModify)
            });
    
            switch(answers["command"]) {
                case CommandsModify.ModifyGenre:
                    await this.promptRemoveInformation();
                    break;
                case CommandsModify.ModifyArtist:
                    await this.promptRemovePlaylistFromScratch();
                    break;
                case CommandsModify.ModifyGroup:
                    await this.promptRemovePlaylistFromExistingOne();
                    break;
                case CommandsModify.ModifySong:
                    await this.promptRemovePlaylist();
                    break;
                case CommandsModify.ModifyAlbum:
                    await this.promptRemovePlaylist();
                    break;
            }
        }
    }

    async funcAddGenre(): Promise<void> {
        console.clear();
        
        const nameGenre = await inquirer.prompt({
            type: "input",
            name: "nameGenre",
            message: "Enter name of the genre:",
        });
    
        if(this.database.findGenre(nameGenre["nameGenre"]) == -1) {
            let newGenre = new Genre(nameGenre["nameGenre"], [], [], []);
            this.database.setGenre(newGenre);
        }
        else
            await this.showMessage("The genre already exists");
    }
}
