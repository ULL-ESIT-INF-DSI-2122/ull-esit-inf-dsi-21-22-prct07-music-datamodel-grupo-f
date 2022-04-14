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

enum ModifyGenreCommands {
    ModifyAuthors = "Modify authors of the genre",
    ModifyAlbums = "Modify albums of the genre",
    ModifySongs = "Modify songs of the genre",
};

enum ModifyArtistCommands {
    ModifyGroups = "Modify groups of the artist",
    ModifyGenres = "Modify genre of the artist",
    ModifyAlbums = "Modify albums of the artist",
    ModifySongs = "Modify songs of the artist",
    ModifyMonthlyListeners = "Modify monthly listeners of the artist",
}

enum ModifyGroupCommands {
    ModifyArtists = "Modify artists of the group",
    ModifyYearCreation = "Modify the year of creation of the group",
    ModifyGenres = "Modify genre of the group",
    ModifyAlbums = "Modify albums of the group",
    ModifyMonthlyListeners = "Modify monthly listeners of the group",
}

enum ModifyAlbumCommands {
    ModifyAuthor = "Modify author of the album",
    ModifyYearPublication= "Modify year of publication of the album",
    ModifyGenres = "Modify genre of the album",
    ModifySongs = "Modify songs of the album",
};

enum ModifySongCommands {
    ModifyAuthor = "Modify author of the song",
    ModifyDurationSong = "Modify the duration of the song",
    ModifyGenresSong = "Modify genres of the song",
    ModifySingeSong = "Modify single of the song",
    ModifyNumberReproductionsSong = "Modify number of reproductions of the song",
};

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

async function getArray(): Promise<string[]> {
    const answer = await inquirer.prompt({
        type: "input",
        name: "array",
        message: "Enter",
    })

    let array: string[] = String(answer["array"]).split(",");
    return array;
}

async function getString(): Promise<string> {
    const answer = await inquirer.prompt({
        type: "input",
        name: "string",
        message: "Enter",
    })

    let str: string = String(answer["string"]);
    return str;
}

async function getNumber(): Promise<number> {
    const answer = await inquirer.prompt({
        type: "input",
        name: "number",
        message: "Enter",
    })

    let num: number = Number(answer["number"]);
    return num;
}

async function getBoolean(): Promise<boolean> {
    const answer = await inquirer.prompt({
        type: "input",
        name: "boolean",
        message: "Enter",
    })

    let bool: boolean = Boolean(answer["boolean"]);
    return bool;
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
                    await this.funcAddArtist();
                    break;
                case CommandsAdd.AddGroup:
                    await this.funcAddGroup();
                    break;
                case CommandsAdd.AddSong:
                    await this.funcAddSong();
                    break;
                case CommandsAdd.AddAlbum:
                    await this.funcAddAlbum();
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
                    await this.funcRemoveGenre();
                    break;
                case CommandsRemove.RemoveArtist:
                    await this.funcRemoveArtist();
                    break;
                case CommandsRemove.RemoveGroup:
                    await this.funcRemoveGroup();
                    break;
                case CommandsRemove.RemoveSong:
                    await this.funcRemoveSong();
                    break;
                case CommandsRemove.RemoveAlbum:
                    await this.funcRemoveAlbum();
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
                    await this.funcModifyGenre();
                    break;
                case CommandsModify.ModifyArtist:
                    await this.funcModifyArtist();
                    break;
                case CommandsModify.ModifyGroup:
                    await this.funcModifyGroup();
                    break;
                case CommandsModify.ModifySong:
                    await this.funcModifySong();
                    break;
                case CommandsModify.ModifyAlbum:
                    await this.funcModifyAlbum();
                    break;
            }
        }
    }

    /**
     * Añade un nuevo género
     */
    async funcAddGenre(): Promise<void> {
        console.clear();
        
        const genreName = await inquirer.prompt({
            type: "input",
            name: "genreName",
            message: "Enter name of the genre:",
        });
    
        if(this.database.findGenre(genreName["genreName"]) === -1) {
            let newGenre = new Genre(genreName["genreName"], [], [], []);
            this.database.setGenre(newGenre);
        }
        else
            await this.showMessage("The genre already exists");
    }

    /**
     * Añade un nuevo artista, actualizando los generos
     */
    async funcAddArtist(): Promise<void> {
        console.clear();
        let allGenres: string[] = [];
        let continueMessage: string;

        // Introducir nombre del artista
        const artistName = await inquirer.prompt({
            type: "input",
            name: "artistName",
            message: "Enter name of artist",
        });

        if(this.database.findArtist(artistName["artistName"]) === -1) {
            // Introducir generos
            do {
                var genreName = await inquirer.prompt({
                    type: "input",
                    name: "genreName",
                    message: "Enter name of the genre:",
                });
                if (this.database.findGenre(genreName["genreName"]) !== -1) {
                    allGenres.push(genreName["genreName"]);
                    const confirmation = await inquirer.prompt({
                        type: "input",
                        name: "confirmation",
                        message: "Add more genres? Yes or No:",
                    });
                    continueMessage = confirmation["confirmation"];
                    continueMessage = continueMessage.toLowerCase();
                } else {
                    await this.showMessage("ERROR: This genre doesn't exists");
                    continueMessage = "no";
                }
            } while (continueMessage = "yes");
            
            // Introducir numero de oyenetes
            const listeners = await inquirer.prompt({
                type: "input",
                name: "listeners",
                message: "Enter number of listeners:",
            });
        
            // Creacion 
            let newArtist = new Artist(artistName["artistName"], [], allGenres, [], [], Number(listeners["listeners"]));
            this.database.setArtist(newArtist);
            // Expansion de los generos
            for (let genre of allGenres) {
                let getGenre = this.database.getGenre(genre);
                if (getGenre !== undefined) {
                    let newAuthors = getGenre.authors;
                    newAuthors.push(artistName["artistName"]);
                    this.database.modifyAuthorsGenre(genre, newAuthors);
                } else {
                    await this.showMessage("ERROR: Genre not found in artist creation");
                }
            }
        }
        else
            await this.showMessage("The artist already exists");
    }

    /**
     * Añade un nuevo grupo, actualizando artistas y generos
     */
    async funcAddGroup(): Promise<void> {
        console.clear();
        let allGenres: string[] = [];
        let allArtist: string[] = [];
        let continueMessage: string;
        
        // Introducir nombre del grupo
        const groupName = await inquirer.prompt({
            type: "input",
            name: "groupName",
            message: "Enter name of group:",
        });
        if(this.database.findGroup(groupName["groupName"]) === -1) {  
            // Introducir anio de creacion          
            const yearCreation = await inquirer.prompt({
                type: "input",
                name: "year",
                message: "Enter the year of creation:",
            });

            // Introducir generos
            do {
                var genreName = await inquirer.prompt({
                    type: "input",
                    name: "genreName",
                    message: "Enter name of the genre:",
                });
                if (this.database.findGenre(genreName["genreName"]) !== -1) {
                    allGenres.push(genreName["genreName"]);
                    const confirmation = await inquirer.prompt({
                        type: "input",
                        name: "confirmation",
                        message: "Add more genres? Yes or No:",
                    });
                    continueMessage = confirmation["confirmation"];
                    continueMessage = continueMessage.toLowerCase();
                } else {
                    await this.showMessage("ERROR: This genre doesn't exists");
                    continueMessage = "no";
                }
            } while (continueMessage = "yes");

            // Introducir artistas
            do {
                var artistName = await inquirer.prompt({
                    type: "input",
                    name: "artistName",
                    message: "Enter the name of the artist component of the group:",
                });
                if (this.database.findArtist(artistName["artistName"]) !== -1) {
                    allArtist.push(artistName["artistName"]);
                    const confirmation = await inquirer.prompt({
                        type: "input",
                        name: "confirmation",
                        message: "Add more artists? Yes or No:",
                    });
                    continueMessage = confirmation["confirmation"];
                    continueMessage = continueMessage.toLowerCase();
                } else {
                    await this.showMessage("ERROR: This artist doesn't exists");
                    continueMessage = "no";
                }
            } while (continueMessage = "yes");

            // Introducir oyentes
            const listeners = await inquirer.prompt({
                type: "input",
                name: "listeners",
                message: "Enter number of listeners:",
            });
            
            // Creacion
            let newGroup = new Group(groupName["groupName"], allArtist, Number(yearCreation["year"]), allGenres, [], Number(listeners["listeners"]));
            this.database.setGroup(newGroup);
            // Expansion de los artistas
            for (let artist of allArtist) {
                let artistToModify = this.database.getArtist(artist);
                if (artistToModify !== undefined) {
                    // Tomar viejos generos y añadirles los nuevos no repetidos
                    let newGenres = artistToModify.genres;
                    for (let toAdd of allGenres) {
                        if (!newGenres.includes(toAdd))
                            newGenres.push(toAdd);
                    }
                    // Modificar generos del artista
                    this.database.modifyGenresArtist(artist, newGenres);

                    // Tomar viejos grupos y añadirle el nuevo
                    let groupsToAdd = artistToModify.groups;
                    groupsToAdd.push(groupName["groupName"]);
                    // Modificar grupos del artista
                    this.database.modifyGroupsArtist(artist, groupsToAdd);

                    // Tomar numero de oyentes individual y sumarle el del grupo
                    let updateListeners: number = artistToModify.monthlyListeners;
                    updateListeners += Number(listeners["listeners"]);
                    // Modificar oyentes del artista
                    this.database.modifyMonthlyListenersArtist(artist, updateListeners);                    
                }
            }
            // Expansion de los generos
            for (let genre of allGenres) {
                let getGenre = this.database.getGenre(genre);
                if (getGenre !== undefined) {
                    // Añadir grupo a autores del genero
                    let newAuthors = getGenre.authors;
                    newAuthors.push(groupName["groupName"]);
                    // Añadir artistas componente del grupo a autores del genero, no repetidos
                    for (let artistToAdd of allArtist) {
                        if (!newAuthors.includes(artistToAdd))
                            newAuthors.push(artistToAdd);
                    }
                    // Modificar autores del genero
                    this.database.modifyAuthorsGenre(genre, newAuthors);
                } else {
                    await this.showMessage("ERROR: Genre not found in artist creation");
                }
            }
        }
        else
            await this.showMessage("The group already exists");
    }
    
    /**
     * Añadir una nueva canción, actualizando albumes, autores y generos
     */
     async funcAddSong(): Promise<void> {
        console.clear();

        const songName = await inquirer.prompt({
            type: "input",
            name: "songName",
            message: "Enter name of song",
        });

        /*const Artist = await inquirer.prompt({
            type: "input",
            name: "Artist",
            message: "Enter artist of song",
        });*/

        if(this.database.findSong(songName["songName"]))
        
        if(this.database.findSong(songName["songName"]) === -1) {
            let newSong = new Song(songName["songName"], "", 0, [], true, 0);
            this.database.setSong(newSong);
        }
        else
            await this.showMessage("The song already exists");
    }

    /**
     * Añadir un nuevo album, actualizando autores y generos
     */
    async funcAddAlbum(): Promise<void> {
        console.clear();

        const albumName = await inquirer.prompt({
            type: "input",
            name: "albumName",
            message: "Enter name of song",
        });
        
        if(this.database.findAlbum(albumName["albumName"]) === -1) {
            let newAlbum = new Album(albumName["albumName"], "", 0, [], []);
            this.database.setAlbum(newAlbum);
        }
        else
            await this.showMessage("The album already exists");
    }

    async funcRemoveGenre(): Promise<void> {
        console.clear();
        
        const genreName = await inquirer.prompt({
            type: "input",
            name: "genreName",
            message: "Enter name of the genre:",
        });
    
        if(this.database.findGenre(genreName["genreName"]) !== -1) 
            this.database.removeGenre(genreName["genreName"]);
        else
            await this.showMessage("The genre does not exist");
    }

    async funcRemoveArtist(): Promise<void> {
        console.clear();

        const artistName = await inquirer.prompt({
            type: "input",
            name: "artistName",
            message: "Enter name of artist",
        });
        
        if(this.database.findArtist(artistName["artistName"]) !== -1)
            this.database.removeArtist(artistName["artistName"]);
        else
            await this.showMessage("The artist does not exist");
    }

    async funcRemoveGroup(): Promise<void> {
        console.clear();

        const groupName = await inquirer.prompt({
            type: "input",
            name: "groupName",
            message: "Enter name of group",
        });
        
        if(this.database.findGroup(groupName["groupName"]) !== -1)
            this.database.removeGroup(groupName["groupName"]);
        else
            await this.showMessage("The group does not exist");
    }

    async funcRemoveSong(): Promise<void> {
        console.clear();

        const songName = await inquirer.prompt({
            type: "input",
            name: "songName",
            message: "Enter name of song",
        });
        
        if(this.database.findSong(songName["songName"]) !== -1)
            this.database.removeSong(songName["songName"]);
        else
            await this.showMessage("The song does not exist");
    }

    async funcRemoveAlbum(): Promise<void> {
        console.clear();

        const albumName = await inquirer.prompt({
            type: "input",
            name: "albumName",
            message: "Enter name of song",
        });
        
        if(this.database.findAlbum(albumName["albumName"]) !== -1)
            this.database.removeAlbum(albumName["albumName"]);
        else
            await this.showMessage("The album does not exist");
    }

    async funcModifyGenre(): Promise<void> {
        console.clear();

        const genreName = await inquirer.prompt({
            type: "input",
            name: "genreName",
            message: "Enter name of genre",
        });

        this.database.viewGenre(genreName["genreName"]);

        const genreOption = await inquirer.prompt({
            type: "list",
            name: "option",
            message: "Choose option",
            choices: Object.values(ModifyGenreCommands)
        });
    
        switch(genreOption["option"]) {
            case ModifyGenreCommands.ModifyAuthors:
                this.database.modifyAuthorsGenre(genreName["genreName"], await getArray());
                break;
            case ModifyGenreCommands.ModifyAlbums:
                this.database.modifyAlbumsGenre(genreName["genreName"], await getArray());
                break;
            case ModifyGenreCommands.ModifySongs:
                this.database.modifySongsGenre(genreName["genreName"], await getArray());
                break;
        }
    }

    async funcModifyArtist(): Promise<void> {
        console.clear();

        const artistName = await inquirer.prompt({
            type: "input",
            name: "artistName",
            message: "Enter name of album",
        });

        this.database.viewArtist(artistName["artistName"]);
    
        const artistOption = await inquirer.prompt({
            type: "list",
            name: "option",
            message: "Choose option",
            choices: Object.values(ModifyArtistCommands)
        });

        switch(artistOption["option"]) {
            case ModifyArtistCommands.ModifyGroups:
                this.database.modifyGroupsArtist(artistName["artistName"], await getArray());
                break;
            case ModifyArtistCommands.ModifyGenres:
                this.database.modifyGenresArtist(artistName["artistName"], await getArray());
                break;
            case ModifyArtistCommands.ModifyAlbums:
                this.database.modifyGenresArtist(artistName["artistName"], await getArray());
                break;
            case ModifyArtistCommands.ModifySongs:
                this.database.modifySongsArtist(artistName["artistName"], await getArray());
                break;
            case ModifyArtistCommands.ModifyMonthlyListeners:
                this.database.modifyMonthlyListenersArtist(artistName["artistName"], await getNumber());
                break;
        }
    }

    async funcModifyGroup(): Promise<void> {
        console.clear();

        const groupName = await inquirer.prompt({
            type: "input",
            name: "groupName",
            message: "Enter name of album",
        });

        this.database.viewGroup(groupName["groupName"]);
    
        const groupOption = await inquirer.prompt({
            type: "list",
            name: "option",
            message: "Choose option",
            choices: Object.values(ModifyGroupCommands)
        });

        switch(groupOption["option"]) {
            case ModifyGroupCommands.ModifyArtists:
                this.database.modifyArtistsGroup(groupName["groupName"], await getArray());
                break;
            case ModifyGroupCommands.ModifyYearCreation:
                this.database.modifyYearCreationGroup(groupName["groupName"], await getNumber());
                break;
            case ModifyGroupCommands.ModifyGenres:
                this.database.modifyGenresGroup(groupName["groupName"], await getArray());
                break;
            case ModifyGroupCommands.ModifyAlbums:
                this.database.modifySongsGenre(groupName["groupName"], await getArray());
                break;
            case ModifyGroupCommands.ModifyMonthlyListeners:
                this.database.modifyMonthlyListenersGroup(groupName["groupName"], await getNumber());
                break;
        }
    }

    async funcModifyAlbum(): Promise<void> {
        console.clear();

        const albumName = await inquirer.prompt({
            type: "input",
            name: "albumName",
            message: "Enter name of album",
        });

        this.database.viewAlbum(albumName["albumName"]);
    
        const albumOption = await inquirer.prompt({
            type: "list",
            name: "option",
            message: "Choose option",
            choices: Object.values(ModifyAlbumCommands)
        });

        switch(albumOption["option"]) {
            case ModifyAlbumCommands.ModifyAuthor:
                this.database.modifyAuthorAlbum(albumName["albumName"], await getString());
                break;
            case ModifyAlbumCommands.ModifyYearPublication:
                this.database.modifyYearPublicationAlbum(albumName["albumName"], await getNumber());
                break;
            case ModifyAlbumCommands.ModifyGenres:
                this.database.modifyGenresAlbum(albumName["albumName"], await getArray());
                break;
            case ModifyAlbumCommands.ModifySongs:
                this.database.modifySongsAlbum(albumName["albumName"], await getArray());
                break;
        }
    }

    async funcModifySong(): Promise<void> {
        console.clear();

        const songName = await inquirer.prompt({
            type: "input",
            name: "songName",
            message: "Enter name of song",
        });

        this.database.viewSong(songName["songName"]);

        const songOption = await inquirer.prompt({
            type: "list",
            name: "option",
            message: "Choose option",
            choices: Object.values(ModifySongCommands)
        });
    
        switch(songOption["option"]) {
            case ModifySongCommands.ModifyAuthor:
                this.database.modifyAuthorSong(songName["songName"], await getString());
                break;
            case ModifySongCommands.ModifyDurationSong:
                this.database.modifyDurationSong(songName["songName"], await getNumber());
                break;
            case ModifySongCommands.ModifyGenresSong:
                this.database.modifyGenresSong(songName["songName"], await getArray());
                break;
            case ModifySongCommands.ModifySingeSong:
                this.database.modifySingleSong(songName["songName"], await getBoolean());
                break;
            case ModifySongCommands.ModifyNumberReproductionsSong:
                this.database.modifyNumberReproductionsSong(songName["songName"], await getNumber())
                break;
        }
    }
}
