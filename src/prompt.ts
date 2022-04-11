import inquirer, { Inquirer, PromptModule} from 'inquirer';
import { Playlist, Song } from './classes';
import { DataBase } from './database';

enum Commands {
    SelectPlatlist = "Select playlist",
    AddPlaylist = "Add playlist",
    RemovePlaylist = "Remove playlist",
    Quit = "Quit",
}

enum CommandsPlaylist {
    AddSong = "Add song to a playlist",
    RemoveSong = "Remove song from a playlist",
    Quit = "Quit",
}

export class Gestor {
    constructor(private database: DataBase) {}
    
    async promptUser(): Promise<void> {
        let answers = {
            command: Commands.SelectPlatlist,
        }
    
        while(answers["command"] != Commands.Quit)
        {
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

    async promptAddSong(playlistName: string): Promise<void> {
        console.clear();
        
        const nameSong = await inquirer.prompt({
            type: "input",
            name: "nameSong",
            message: "Enter name of the song:",
        });
    
        if(this.database.findSong(nameSong["nameSong"]) != -1)
        {
            this.database.setSongToPlaylist(nameSong["nameSong"], playlistName);
            this.database.updateDurationPlaylist(playlistName);
        }
        else
            console.log("The song doesnt exists");
    }

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

    async promptSelectPlaylist(): Promise<void> {
        console.clear();
    
        const playlistName = await inquirer.prompt({
            type: "input",
            name: "playlistName",
            message: "Enter name of the playlist: ",
        });
    
        await this.promptUserPlaylist(playlistName["playlistName"]);
    }

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
