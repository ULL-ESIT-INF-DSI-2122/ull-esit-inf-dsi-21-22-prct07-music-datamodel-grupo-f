import inquirer from 'inquirer';
import { Playlist } from './classes';
import { DataBase } from './database';

/**
 * Comandos del menú principal
 */
enum Commands {
    SelectPlatlist = "Select playlist",
    AddPlaylist = "Add playlist",
    RemovePlaylist = "Remove playlist",
    Quit = "Quit",
}

/**
 * Comandos para gestionar una playlist
 */
enum CommandsPlaylist {
    AddSong = "Add song to a playlist",
    RemoveSong = "Remove song from a playlist",
    Quit = "Quit",
}

/**
 * Clase Gestor
 */
export class Gestor {
    /**
     * Constructor
     * @param database Base de datos
     */
    constructor(private database: DataBase) {}
    
    /**
     * Menú principal donde se podrán ejecutar los comandos
     */
    async promptUser(): Promise<void> {
        let answers = {
            command: Commands.SelectPlatlist,
        }
    
        while(answers["command"] != Commands.Quit) {
            console.clear();
            this.database.viewPlaylists();
            answers = await inquirer.prompt({
                type: "list",
                name: "command",
                message: "Choose option",
                choices: Object.values(Commands)
            });
    
            switch(answers["command"]) {
                case Commands.SelectPlatlist:
                    await this.promptSelectPlaylist();
                    break;
                case Commands.AddPlaylist:
                    await this.promptAddPlaylist();
                    break;
                case Commands.RemovePlaylist:
                    await this.promptRemovePlaylist();
                    break;
            }
        }
    }

    /**
     * Menú de una playlist donde se podran ejecutar los comandos para manipular una playlist
     * @param playlistName Nombre de la playlist a gestionar
     */
    async promptUserPlaylist(playlistName: string): Promise<void> {
        let answers = {
            commandPlaylist: CommandsPlaylist.AddSong,
        }
    
        while(answers["commandPlaylist"] != CommandsPlaylist.Quit) {
            console.clear();
            this.database.viewPlaylist(playlistName);
            const answers = await inquirer.prompt({
                type: "list",
                name: "commandPlaylist",
                message: "Choose option",
                choices: Object.values(CommandsPlaylist)
            });
    
            switch(answers["commandPlaylist"]) {
                case CommandsPlaylist.AddSong:
                    await this.promptAddSong(playlistName);
                    break;
                case CommandsPlaylist.RemoveSong:
                    await this.promptRemoveSong(playlistName);
                    break;
                case CommandsPlaylist.Quit:
                    break;
            }
    
            if(answers["commandPlaylist"] === CommandsPlaylist.Quit)
                break;
        }
    }

    /**
     * Añade una canción a una playlist
     * @param playlistName Nombre de la playlist donde se va a añadir la canción
     */
    async promptAddSong(playlistName: string): Promise<void> {
        console.clear();
        
        const nameSong = await inquirer.prompt({
            type: "input",
            name: "nameSong",
            message: "Enter name of the song:",
        });
    
        if(this.database.findSong(nameSong["nameSong"]) != -1) {
            this.database.setSongToPlaylist(nameSong["nameSong"], playlistName);
            this.database.updateDurationPlaylist(playlistName);
        }
        else
            console.log("The song doesnt exists");
    }

    /**
     * Elimina una canción de una playlist
     * @param playlistName Nombre de la playlist donde se va a eliminar la canción
     */
    async promptRemoveSong(playlistName: string): Promise<void> {
        console.clear();
        
        const nameSong = await inquirer.prompt({
            type: "input",
            name: "nameSong",
            message: "Enter name of the song:",
        });
    
        this.database.removeSongFromPlaylist(playlistName, nameSong["nameSong"]);
        this.database.updateDurationPlaylist(playlistName);
    }

    /**
     * Abre el menú al seleccionar una playlist
     */
    async promptSelectPlaylist(): Promise<void> {
        console.clear();
    
        const playlistName = await inquirer.prompt({
            type: "input",
            name: "playlistName",
            message: "Enter name of the playlist: ",
        });
    
        await this.promptUserPlaylist(playlistName["playlistName"]);
    }

    /**
     * Añade una playlist
     */
    async promptAddPlaylist(): Promise<void> {
        console.clear();
        
        const playlistName = await inquirer.prompt({
            type: "input",
            name: "playlistName",
            message: "Enter name of the playlist: ",
        });
    
        let newPlaylist = new Playlist (playlistName["playlistName"], [], 0, [])
        this.database.setPlaylist(newPlaylist);
    }

    /**
     * Elimina una playlist
     */
    async promptRemovePlaylist(): Promise<void> {
        console.clear();
        
        const playlistName = await inquirer.prompt({
            type: "input",
            name: "playlistName",
            message: "Enter name of the playlist: ",
        });
    
        this.database.removePlaylist(playlistName["playlistName"]);
    }
}
