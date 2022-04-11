import inquirer, { Inquirer, PromptModule} from 'inquirer';
import { Playlist, Song } from './classes';
import { DataBase } from "./database";

let database: DataBase = new DataBase();

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

export async function promptUser(): Promise<void> {
    let answers = {
        command: Commands.SelectPlatlist,
    }

    while(answers["command"] != Commands.Quit)
    {
        console.clear();
        database.viewPlaylists();
        answers = await inquirer.prompt({
            type: "list",
            name: "command",
            message: "Choose option",
            choices: Object.values(Commands)
        });

        switch(answers["command"]) {
            case Commands.SelectPlatlist:
                await promptSelectPlaylist();
                break;
            case Commands.AddPlaylist:
                await promptAddPlaylist();
                break;
            case Commands.RemovePlaylist:
                await promptRemovePlaylist();
                break;
        }
    }
}

export async function promptUserPlaylist(playlistName: string): Promise<void> {
    let answers = {
        commandPlaylist: CommandsPlaylist.AddSong,
    }

    while(answers["commandPlaylist"] != CommandsPlaylist.Quit) {
        console.clear();
        database.viewPlaylist(playlistName);
        const answers = await inquirer.prompt({
            type: "list",
            name: "commandPlaylist",
            message: "Choose option",
            choices: Object.values(CommandsPlaylist)
        });

        switch(answers["commandPlaylist"]) {
            case CommandsPlaylist.AddSong:
                await promptAddSong(playlistName);
                break;
            case CommandsPlaylist.RemoveSong:
                await promptRemoveSong(playlistName);
                break;
            case CommandsPlaylist.Quit:
                break;
        }

        if(answers["commandPlaylist"] === CommandsPlaylist.Quit)
            break;
    }
}

export async function promptAddSong(playlistName: string): Promise<void> {
    console.clear();
    
    const nameSong = await inquirer.prompt({
        type: "input",
        name: "nameSong",
        message: "Enter name of the song:",
    });

    if(database.findSong(nameSong["nameSong"]) != -1)
    {
        database.setSongToPlaylist(nameSong["nameSong"], playlistName);
        database.updateDurationPlaylist(playlistName);
    }
    else
        console.log("The song doesnt exists");
}

export async function promptRemoveSong(playlistName: string): Promise<void> {
    console.clear();
    
    const nameSong = await inquirer.prompt({
        type: "input",
        name: "nameSong",
        message: "Enter name of the song:",
    });

    database.removeSongFromPlaylist(playlistName, nameSong["nameSong"]);
}

export async function promptSelectPlaylist(): Promise<void> {
    console.clear();

    const playlistName = await inquirer.prompt({
        type: "input",
        name: "playlistName",
        message: "Enter name of the playlist: ",
    });

    await promptUserPlaylist(playlistName["playlistName"]);
}

export async function promptAddPlaylist(): Promise<void> {
    console.clear();
    
    const playlistName = await inquirer.prompt({
        type: "input",
        name: "playlistName",
        message: "Enter name of the playlist: ",
    });

    let newPlaylist = new Playlist (playlistName["playlistName"], [], 0, [])
    database.setPlaylist(newPlaylist);
}

export async function promptRemovePlaylist(): Promise<void> {
    console.clear();
    
    const playlistName = await inquirer.prompt({
        type: "input",
        name: "playlistName",
        message: "Enter name of the playlist: ",
    });

    database.removePlaylist(playlistName["playlistName"]);
}
