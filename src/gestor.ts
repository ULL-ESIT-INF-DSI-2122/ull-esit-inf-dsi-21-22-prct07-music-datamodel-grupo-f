import inquirer from 'inquirer';
import { Playlist } from './classes';
import { DataBase } from './database';

/**
 * Comandos del menú principal
 */
enum Commands {
    SelectPlatlist = "Select playlist",
    AddPlaylistFromScratch = "Add playlist from scratch",
    AddPlaylistFromExistingOne = "Add playlist from existing one",
    RemovePlaylist = "Remove playlist",
    Quit = "Quit",
}

/**
 * Comandos para gestionar una playlist
 */
enum CommandsPlaylist {
    AddSong = "Add song to a playlist",
    RemoveSong = "Remove song from a playlist",
    DurationSort = "Sort by duration",
    AlphabeticalSongNameSort = "Sort by song name",
    AlphabeticalAuthorNameSort = "Sort by author name",
    NumberOfReproductionSort = "Sort by number of reproductions",
    GenreSort = "Sort by genre",
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
                case Commands.AddPlaylistFromScratch:
                    await this.promptAddPlaylistFromScratch();
                    break;
                case Commands.AddPlaylistFromExistingOne:
                    await this.promptAddPlaylistFromExistingOne();
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
            console.log(this.database.viewPlaylist(playlistName));
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
                case CommandsPlaylist.DurationSort:
                    await this.promptDurationSort(playlistName);
                    break;
                case CommandsPlaylist.AlphabeticalSongNameSort:
                    await this.promptAlphabeticalSongNameSort(playlistName);
                    break;
                case CommandsPlaylist.AlphabeticalAuthorNameSort:
                    await this.promptAlphabeticalAuthorNameSort(playlistName);
                    break;
                case CommandsPlaylist.NumberOfReproductionSort:
                    await this.promptNumberOfReproductionSort(playlistName);
                    break;
                case CommandsPlaylist.GenreSort:
                    await this.promptGenreSort(playlistName);
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
            this.database.updateGenresPlaylist(playlistName);
        }
        else
            await this.showMessage("The song doesnt exists");
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
        this.database.updateGenresPlaylist(playlistName);
    }

    /**
     * Ordena la playlist por género
     * @param playlistName Nombre de la playlist que se va ordenar
     */
     async promptGenreSort(playlistName: string): Promise<void> {
        console.clear();

        const nameGenre = await inquirer.prompt({
            type: "input",
            name: "nameGenre",
            message: "Enter the genre:",
        });

        this.database.genreSort(nameGenre["nameGenre"], playlistName);
    }

    /**
     * Ordena la playlist por duración
     * @param playlistName Nombre de la playlist que se va ordenar
     */
    async promptDurationSort(playlistName: string): Promise<void> {
        console.clear();
        this.database.durationSort(playlistName);
    }

    /**
     * Ordena la playlist alfabéticamente por el nombre de la canción
     * @param playlistName Nombre de la playlist que se va ordenar
     */
    async promptAlphabeticalSongNameSort(playlistName: string): Promise<void> {
        console.clear();
        this.database.alphabeticalSongNameSort(playlistName);
    }


    /**
     * Ordena la playlist alfabéticamente por el nombre del autor de la canción
     * @param playlistName Nombre de la playlist que se va ordenar
     */
    async promptAlphabeticalAuthorNameSort(playlistName: string): Promise<void> {
        console.clear();
        this.database.alphabeticalAuthorNameSort(playlistName);
    }

    /**
     * Ordena la playlist alfabéticamente por el número de reproducciones
     * @param playlistName Nombre de la playlist que se va ordenar
     */
    async promptNumberOfReproductionSort(playlistName: string): Promise<void> {
        console.clear();
        this.database.numberOfReproductionSort(playlistName);
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
     * Añade una playlist desde cero
     */
    async promptAddPlaylistFromScratch(): Promise<void> {
        console.clear();
        
        const playlistName = await inquirer.prompt({
            type: "input",
            name: "playlistName",
            message: "Enter name of the playlist: ",
        });

        if(this.database.findPlaylist(playlistName["playlistName"]) == -1) {
            let newPlaylist = new Playlist (playlistName["playlistName"], [], 0, [], "user")
            this.database.setPlaylist(newPlaylist);
        } else {
            await this.showMessage("A playlist with this name already exists");
        } 
    }

    /**
     * Añade una playlist desde una existente
     */
    async promptAddPlaylistFromExistingOne(): Promise<void> {
        console.clear();
        this.database.viewPlaylists();
        
        const playlistName = await inquirer.prompt({
            type: "input",
            name: "playlistName",
            message: "Enter name of the base playlist: ",
        });

        const newplaylistName = await inquirer.prompt({
            type: "input",
            name: "newPlaylistName",
            message: "Enter name of the new playlist: ",
        });

        if (playlistName["playlistName"] !== newplaylistName["newPlaylistName"]) {
            let playlist = this.database.getPlaylist(playlistName["playlistName"]);
            if (playlist !== undefined) {
                let copyPlaylist = new Playlist (newplaylistName["newPlaylistName"], playlist.songs, playlist.duration, playlist.genres, "user");
                this.database.setPlaylist(copyPlaylist);
            } else {
                await this.showMessage("ERROR: Could not create playlist");
            }
        } else {
            await this.showMessage("The new playlist must have a different name than the original")
        }
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

        let playlist = this.database.getPlaylist(playlistName["playlistName"]);

        if (playlist !== undefined) {
            if (playlist.owner !== 'system') {
                this.database.removePlaylist(playlistName["playlistName"]);
            } else {
                await this.showMessage("Can't delete system owned playlists");
            }
        } else {
            await this.showMessage("ERROR: Could not get playlist");
        }    
    }
}
