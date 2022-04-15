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
    ViewInfo = "View info of an author",
    AlphabeticalSongNameSort = "Sort by song name",
    AlphabeticalAlbumNameSort = "Sort by album name",
    NumberOfReproductionSort = "Sort by number of reproductions",
    SingelSort = "Sort by single of a song",
    Quit = "Quit",
}

/**
 * Comandos para modificar los atributos de un género
 */
enum ModifyGenreCommands {
    ModifyAuthors = "Modify authors of the genre",
    ModifyAlbums = "Modify albums of the genre",
    ModifySongs = "Modify songs of the genre",
};

/**
 * Comandos para modificar los atributos de un artista
 */
enum ModifyArtistCommands {
    ModifyGroups = "Modify groups of the artist",
    ModifyGenres = "Modify genre of the artist",
    ModifyAlbums = "Modify albums of the artist",
    ModifySongs = "Modify songs of the artist",
    ModifyMonthlyListeners = "Modify monthly listeners of the artist",
}

/**
 * Comandos para modificar los atributos de un grupo
 */
enum ModifyGroupCommands {
    ModifyArtists = "Modify artists of the group",
    ModifyYearCreation = "Modify the year of creation of the group",
    ModifyGenres = "Modify genre of the group",
    ModifyAlbums = "Modify albums of the group",
    ModifyMonthlyListeners = "Modify monthly listeners of the group",
}

/**
 * Comandos para modificar los atributos de un album
 */
enum ModifyAlbumCommands {
    ModifyAuthor = "Modify author of the album",
    ModifyYearPublication= "Modify year of publication of the album",
    ModifyGenres = "Modify genre of the album",
    ModifySongs = "Modify songs of the album",
};

/**
 * Comandos para modificar los atributos de una canción
 */
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

/**
 * Elimina un elemento de un array
 */
function removeItemFromArr<type> (arr:type[], item:type) {
    var i = arr.indexOf( item );
 
    if ( i !== -1 ) {
        arr.splice( i, 1 );
    }
}

/**
 * Recoge por línea de comando un array de strings
 * @returns Una promesa de un array de strings
 */
async function getArray(): Promise<string[]> {
    const answer = await inquirer.prompt({
        type: "input",
        name: "array",
        message: "Enter",
    })

    let array: string[] = String(answer["array"]).split(",");
    return array;
}

/**
 * Recoge por línea de comando un string
 * @returns Una promesa de un string
 */
async function getString(): Promise<string> {
    const answer = await inquirer.prompt({
        type: "input",
        name: "string",
        message: "Enter",
    })

    let str: string = String(answer["string"]);
    return str;
}

/**
 * Recoge una línea de comando un número
 * @returns Una promesa de un número
 */
async function getNumber(): Promise<number> {
    const answer = await inquirer.prompt({
        type: "input",
        name: "number",
        message: "Enter",
    })

    let num: number = Number(answer["number"]);
    return num;
}

/**
 * Recoge una línea de comando un boolean
 * @returns Una promesa de un boolean
 */
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
        await sleep(5000);
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
                    await this.promptVisualizerInformation();
                    break;
            }
        }
    } 
    
    /**
     * Menú para añadir información a la base de datos
     */
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

    /**
     * Menú para eliminar información de la base de datos
     */
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
                    const genreName = await inquirer.prompt({
                        type: "input",
                        name: "genreName",
                        message: "Enter name of the genre:",
                    });
                    await this.funcRemoveGenre(genreName["genreName"]);
                    break;
                case CommandsRemove.RemoveArtist:
                    const artistName = await inquirer.prompt({
                        type: "input",
                        name: "artistName",
                        message: "Enter name of the artist:",
                    });
                    await this.funcRemoveArtist(artistName["artistName"]);
                    break;
                case CommandsRemove.RemoveGroup:
                    const groupName = await inquirer.prompt({
                        type: "input",
                        name: "groupName",
                        message: "Enter name of the group:",
                    });
                    await this.funcRemoveGroup(groupName["groupName"]);
                    break;
                case CommandsRemove.RemoveSong:
                    const songName = await inquirer.prompt({
                        type: "input",
                        name: "songName",
                        message: "Enter name of song:",
                    });
                    await this.funcRemoveSong(songName["songName"]);
                    break;
                case CommandsRemove.RemoveAlbum:
                    const albumName = await inquirer.prompt({
                        type: "input",
                        name: "albumName",
                        message: "Enter name of the album:",
                    });
                    await this.funcRemoveAlbum(albumName["albumName"]);
                    break;
            }
        }
    }

    /**
     * Menú para modificar información de la base de datos
     */
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

    async promptVisualizerInformation(): Promise<void> {
        let list: string[][] = [[], []];
        let songs: string[] = [];
        let albums: string[] = [];
        let answers = {
            command: CommandsVisualizer.Quit,
        }
    
        while(answers["command"] != CommandsVisualizer.Quit) {
            console.clear();
            console.log("--- DATABASE MANIPULATOR ---");
            console.log("--- Visualizer Information ---");
            if(songs !== [])
            {
                console.log("Songs:");
                console.log(songs);
            }
            if(albums !== [])
            {
                console.log("Albums:");
                console.log(albums);
            }
            answers = await inquirer.prompt({
                type: "list",
                name: "command",
                message: "Choose option",
                choices: Object.values(CommandsVisualizer)
            });
    
            switch(answers["command"]) {
                case CommandsVisualizer.ViewInfo:
                    list = await this.funcViewInfo();
                    songs = list[0];
                    albums = list[1];
                    break;
                case CommandsVisualizer.NumberOfReproductionSort:
                    this.numberReproductionsSort(songs);
                    break;
                case CommandsVisualizer.AlphabeticalAlbumNameSort:
                    this.alphabeticalSort(albums);
                    break;
                case CommandsVisualizer.AlphabeticalSongNameSort:
                    this.alphabeticalSort(songs);
                    break;
                case CommandsVisualizer.SingelSort:
                    this.singleSort(songs);
                    break;
            }
        }
    }

    /**
     * Busca información asociada a un autor
     */
    async funcViewInfo():Promise<string[][]> {
        let list: string[][] = [[], []];
        console.clear();
        
        const authorName = await inquirer.prompt({
            type: "input",
            name: "authorName",
            message: "Enter name of the genre:",
        });

        if(this.database.findArtist(authorName["authorName"]) !== -1)
        {
            this.database.getArtist(authorName["authorName"]).songs.forEach((songName: string) => {
                list[0].push(songName);
            });
            this.database.getArtist(authorName["authorName"]).albums.forEach((albumName: string) => {
                list[1].push(albumName);
            });
        }
        else if(this.database.findGroup(authorName["authorName"]) !== -1)
        {
            this.database.getGroup(authorName["authorName"]).albums.forEach((albumName: string) => {
                list[1].push(albumName)
            });
        }
        else
            await this.showMessage("The author does not exist");
        
        return list;
    }

    numberReproductionsSort(list: string[]) {
        list.sort((song1: string, song2: string) => {
            let reproductions1: number = this.database.getSong(song1).numberReproductions as number;
            let reproductions2: number = this.database.getSong(song2).numberReproductions as number;
            return reproductions1 - reproductions2;
        });
    }

    alphabeticalSort(list: string[]) {
        list.sort((element1: string, element2: string) => {
            return element1.normalize().localeCompare(element2.normalize());
        });
    }

    yearPublicactionSort(list: string[]) {
        list.sort((album1: string, album2: string) => {
            let yearPublicaction1: number = this.database.getAlbum(album1).yearPublication as number;
            let yearPublicaction2: number = this.database.getAlbum(album2).yearPublication as number;
            return yearPublicaction1 - yearPublicaction2;
        });
    }

    singleSort(list: string[]) {
        list.sort((song1: string, song2: string) => {
            let bool1 = this.database.getSong(song1).single;
            let bool2 = this.database.getSong(song2).single;
            let single1: number = Number(bool1);
            let single2: number = Number(bool2)
            return single2 - single1;
        });
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
        let continueMessage: string = '';

        // Introducir nombre del artista
        const artistName = await inquirer.prompt({
            type: "input",
            name: "artistName",
            message: "Enter name of artist:",
        });

        if(this.database.findArtist(artistName["artistName"]) === -1) {
            // Introducir generos
            do {
                var genreName = await inquirer.prompt({
                    type: "input",
                    name: "genreName",
                    message: "Enter name of the genre:",
                });
                if (this.database.findGenre(genreName["genreName"]) === -1) {
                    let newGenre = new Genre(genreName["genreName"], [], [], []);
                    this.database.setGenre(newGenre);
                } 
                allGenres.push(genreName["genreName"]);
                const confirmation = await inquirer.prompt({
                    type: "input",
                    name: "confirmation",
                    message: "Add more genres? Yes or No:",
                });
                continueMessage = confirmation["confirmation"];
                continueMessage = continueMessage.toLowerCase();
            } while (continueMessage == "yes");
            
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
                if (this.database.findGenre(genreName["genreName"]) === -1) {
                    let newGenre = new Genre(genreName["genreName"], [], [], []);
                    this.database.setGenre(newGenre);
                } 
                allGenres.push(genreName["genreName"]);
                const confirmation = await inquirer.prompt({
                    type: "input",
                    name: "confirmation",
                    message: "Add more genres? Yes or No:",
                });
                continueMessage = confirmation["confirmation"];
                continueMessage = continueMessage.toLowerCase();
            } while (continueMessage == "yes");

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
            } while (continueMessage == "yes");

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
                } else {
                    await this.showMessage("ERROR: The artis doesn`t exist");
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
     * Añadir una nueva canción, actualizando autores y generos
     */
     async funcAddSong(): Promise<void> {
        console.clear();
        let check: boolean = false;
        let allGenres: string[] = [];
        let continueMessage: string;
        let singleValue: boolean;

        // Introducir nombre de la canción
        const songName = await inquirer.prompt({
            type: "input",
            name: "songName",
            message: "Enter name of song:",
        });        
        if(this.database.findSong(songName["songName"]) === -1) {
            // Introducir nombre del autor
            do {
                var authorName = await inquirer.prompt({
                    type: "input",
                    name: "authorName",
                    message: "Enter name of the author:",
                });  
                if ((this.database.findArtist(authorName["authorName"]) !== -1) || 
                    (this.database.findGroup(authorName["authorName"]) !== -1)) {
                        check = true;
                } else {
                    await this.showMessage("This author doesn`t exists");
                }
            } while (!check);

            // Introducir duración de la canción
            const duration = await inquirer.prompt({
                type: "input",
                name: "duration",
                message: "Enter duration (minutes.seconds):",
            });  

            // Introducir generos
            do {
                var genreName = await inquirer.prompt({
                    type: "input",
                    name: "genreName",
                    message: "Enter name of the genre:",
                });
                if (this.database.findGenre(genreName["genreName"]) === -1) {
                    let newGenre = new Genre(genreName["genreName"], [], [], []);
                    this.database.setGenre(newGenre);
                } 
                allGenres.push(genreName["genreName"]);
                const confirmation = await inquirer.prompt({
                    type: "input",
                    name: "confirmation",
                    message: "Add more genres? Yes or No:",
                });
                continueMessage = confirmation["confirmation"];
                continueMessage = continueMessage.toLowerCase();
            } while (continueMessage == "yes");


            // Introducir single
            const single = await inquirer.prompt({
                type: "input",
                name: "single",
                message: "The song is a single? Yes or No:",
            });  
            let singleMessage: string = single["single"];
            singleMessage = singleMessage.toLowerCase();
            if (singleMessage === 'yes') {
                singleValue = true;
            } else {
                singleValue = false;
            }

            // Introducir numero de reproducciones
            const numRepr = await inquirer.prompt({
                type: "input",
                name: "numRepr",
                message: "Enter the number of reproductions:",
            });  

            // Creacion
            let newSong = new Song(songName["songName"], authorName["authorName"], Number(duration["duration"]),
                allGenres, singleValue, Number(numRepr["numRepr"]));
            this.database.setSong(newSong);

            // Expansion autor
            if ((this.database.findArtist(authorName["authorName"]) !== -1)) {
                // Actualizar un artista
                let artistToModify = this.database.getArtist(authorName["authorName"]);
                if (artistToModify !== undefined) {
                    // Tomar generos antiguos y actualizarlo
                    let newGenres = artistToModify.genres;
                    for (let toAdd of allGenres) {
                        if (!newGenres.includes(toAdd)) {
                            newGenres.push(toAdd);
                            // Actualizar los artistas del genero, no repetidos
                            let getGenre = this.database.getGenre(toAdd);
                            if (getGenre !== undefined) {
                                let newAuthors = getGenre.authors;
                                if (!newAuthors.includes(authorName["authorName"])) {
                                    newAuthors.push(authorName["authorName"]);
                                    // Modificar autores del genero
                                    this.database.modifyAuthorsGenre(toAdd, newAuthors);
                                }
                            } else {
                                await this.showMessage("ERROR: Genre not found in artist expansion");
                            }
                        }
                    }
                    // Modificar generos del artista
                    this.database.modifyGenresArtist(authorName["authorName"], newGenres);

                    // Actualizar lista de canciones del artista
                    let newSongs = artistToModify.songs;
                    newSongs.push(songName["songName"]);
                    this.database.modifySongsArtist(authorName["authorName"], newSongs);
                } else {
                    await this.showMessage("ERROR: The artist doesn`t exist");
                }
            } else if (this.database.findGroup(authorName["authorName"]) !== -1) {
                // Actualizar un grupo
                let groupToModify = this.database.getGroup(authorName["authorName"]);
                if (groupToModify !== undefined) {
                    // Tomar generos antiguos y actualizarlos
                    let newGenres = groupToModify.genres;
                    for (let toAdd of allGenres) {
                        if (!newGenres.includes(toAdd))
                            newGenres.push(toAdd);
                    }
                    // Modificar generos del grupo
                    this.database.modifyGenresGroup(authorName["authorName"], newGenres);                    
                } else {
                    await this.showMessage("ERROR: The group doesn`t exist");
                }
            } else {
                await this.showMessage("ERROR: The author doesn`t exists");
            }

            // Expansion generos
            for (let genre of allGenres) {
                let genreToModify = this.database.getGenre(genre);
                let newSongs = genreToModify.songs;
                newSongs.push(songName["songName"]);
                this.database.modifySongsGenre(genre, newSongs);
            }
        }
        else
            await this.showMessage("The song already exists");
    }

    /**
     * Añadir un nuevo album, actualizando autores y generos
     */
    async funcAddAlbum(): Promise<void> {
        console.clear();
        let name: string;
        let songs: string[] = [];
        let genres: string[] = [];
        let autor: string;
        let year: number;

        // Introducir nombre del album
        const albumName = await inquirer.prompt({
            type: "input",
            name: "albumName",
            message: "Enter the name of album:"
        });
        name = String(albumName["albumName"]);
        if(this.database.findAlbum(name) != -1){
            await this.showMessage("The album already exists");
            return;
        }

        // Introducir el año de publicacion
        const albumYear = await inquirer.prompt({
            type: "input",
            name: "albumYear",
            message: "Enter the year when the album was published:"
        });
        year = Number(albumYear["albumYear"]);

        // Introducir autor del album
        do{
            const albumAutor = await inquirer.prompt({
                type: "input",
                name: "albumAutor",
                message: "Enter the autor of album:"
            });
            autor = String(albumAutor["albumAutor"]);
            if (this.database.findArtist(autor) == -1 && this.database.findGroup(autor) == -1)
                await this.showMessage("ERROR: This autor doesn't exists");
        }while(this.database.findArtist(autor) == -1 && this.database.findGroup(autor) == -1);

        // Introducir canciones
        var songsNumber = await inquirer.prompt({
            type: "input",
            name: "songsNumber",
            message: "Enter the amount of songs included in the album:"
        });

        for(let i = 0; i < Number(songsNumber["songsNumber"]); i++){
            do{
                var songName = await inquirer.prompt({
                    type: "input",
                    name: "songName",
                    message: "Enter the name of the song:"
                });
                if (this.database.findSong(songName["songName"]) !== -1)
                    songs.push(songName["songName"]);
                else
                    await this.showMessage("ERROR: This song doesn't exists");
            }while(this.database.findSong(songName["songName"]) === -1);
        }
        
        // Creacion
        let newAlbum = new Album(name, autor, year, genres, songs);
        this.database.setAlbum(newAlbum);

        // Expansion del autor
        if ((this.database.findArtist(autor) !== -1)) {
            // Actualizar un artista - Añadir nuevo album
            let artistToModify = this.database.getArtist(autor);
            let newAlbum = artistToModify.albums;
            newAlbum.push(name);
            this.database.modifyAlbumsArtist(autor, newAlbum);
        } else if (this.database.findGroup(autor) !== -1) {
            // Actualizar un grupo - Añadir nuevo album
            let groupToModify = this.database.getGroup(autor);
            let newAlbum = groupToModify.albums;
            newAlbum.push(name);
            this.database.modifyAlbumsGroup(autor, newAlbum);                   
        } else {
            await this.showMessage("ERROR: The author doesn`t exists");
        }
        // Expansion del genero
        for (let songIndx of songs) {
            let songConsult = this.database.getSong(songIndx);
            for (let songGenres of songConsult.genres) {
                if (!genres.includes(songGenres))
                    genres.push(songGenres);
            }
        }
        for (let genreName of genres) {
            let genreToModify = this.database.getGenre(genreName);
            let newAlbum = genreToModify.albums;
            newAlbum.push(name);
            this.database.modifyAlbumsGenre(genreName, newAlbum);
        }
    }

    /**
     * Función que elimina un album
     */
    async funcRemoveAlbum(albumName: string): Promise<void> {
        console.clear();
        
        if(this.database.findAlbum(albumName) !== -1) {
            let albumToRemove = this.database.getAlbum(albumName);
            // Eliminar album de la lista en Generos asociados
            for (let genre of albumToRemove.genres) {
                let genreToModify = this.database.getGenre(genre);
                removeItemFromArr<string>(genreToModify.albums, albumName);
            }
            // Eliminar objeto Album de la base de datos
            this.database.removeAlbum(albumName);
            // Eliminar de la lista de autor asociados
            if (this.database.findArtist(albumToRemove.author) != -1) {
                let artistToModify = this.database.getArtist(albumToRemove.author);
                let newAlbums = artistToModify.albums;
                removeItemFromArr<string>(newAlbums, albumName);
                this.database.modifyAlbumsArtist(albumToRemove.author, newAlbums);
            } else if (this.database.findGroup(albumToRemove.author) != -1) {
                let groupToModify = this.database.getGroup(albumToRemove.author);
                let newAlbums = groupToModify.albums;
                removeItemFromArr<string>(newAlbums, albumName);
                this.database.modifyAlbumsGroup(albumToRemove.author, newAlbums);
            } else {
                await this.showMessage("The author doesn't exists");
            }
        }
        else
            await this.showMessage("The album does not exist");
    }

    /**
     * Función que elimina una canción
     */
     async funcRemoveSong(songName: string): Promise<void> {
        console.clear();
        
        if(this.database.findSong(songName) !== -1) {
            let songToRemove = this.database.getSong(songName);
            // Eliminar de la lista de géneros asociados
            for (let genre of songToRemove.genres) {
                let genreToModify = this.database.getGenre(genre);
                removeItemFromArr<string>(genreToModify.songs, songName);
            }
            // Eliminar de la lista de albumes asociados, eliminar album si se queda vacia
            let albumToModify = this.database.getAlbumWithSong(songName);
            if (albumToModify != undefined) {
                removeItemFromArr<string>(albumToModify.songs, songName);
                if (!albumToModify.songs.length) {
                    this.funcRemoveAlbum(albumToModify.name);
                }
            } else {
                await this.showMessage("Could not find the album");
            }
            // Eliminar objeto Song de la base de datos
            this.database.removeSong(songName);
            // Eliminar cancion de la lista de artista asociado
            if (this.database.findArtist(songToRemove.author) !== -1) {
                let artistToModify = this.database.getArtist(songToRemove.author);
                let newSongs = artistToModify.songs;
                removeItemFromArr<string>(newSongs, songName);
                this.database.modifySongsArtist(songToRemove.author, newSongs);
            }
        }
        else
            await this.showMessage("The song does not exist");
    }    

    /**
     * Función que elimina un género
     */
    async funcRemoveGenre(genreName: string): Promise<void> {
        console.clear();
    
        if(this.database.findGenre(genreName) !== -1) 
            this.database.removeGenre(genreName);
        else
            await this.showMessage("The genre does not exist");
    }

    /**
     * Función que elimina un artista
     */
    async funcRemoveArtist(artistName: string): Promise<void> {
        console.clear();

        if(this.database.findArtist(artistName) !== -1)
            this.database.removeArtist(artistName);
        else
            await this.showMessage("The artist does not exist");
    }

    /**
     * Función que elimina un grupo
     */
    async funcRemoveGroup(groupName: string): Promise<void> {
        console.clear();

        if(this.database.findGroup(groupName) !== -1)
            this.database.removeGroup(groupName);
        else
            await this.showMessage("The group does not exist");
    }

    /**
     * Función que modifica los atributos de un género
     */
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

    /**
     * Función que modifica los atributos de un artista
     */
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

    /**
     * Función que modifica los atributos de un grupo
     */
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

    /**
     * Función que modifica los atributos de un album
     */
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

    /**
     * Función que modifica los atributos de una canción
     */
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
