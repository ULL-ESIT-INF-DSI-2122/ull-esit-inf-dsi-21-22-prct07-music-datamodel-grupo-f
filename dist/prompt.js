"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Comandos del menú principal
 */
var Commands;
(function (Commands) {
    Commands["AddInformation"] = "Add new information to DataBase";
    Commands["RemoveInformation"] = "Remove information from DataBase";
    Commands["ModifyInformation"] = "Add playlist from existing one";
    Commands["VizualizeInformation"] = "Remove playlist";
    Commands["Quit"] = "Quit";
})(Commands || (Commands = {}));
/**
 * Comandos para gestionar una playlist
 */
var CommandsPlaylist;
(function (CommandsPlaylist) {
    CommandsPlaylist["AddSong"] = "Add song to a playlist";
    CommandsPlaylist["RemoveSong"] = "Remove song from a playlist";
    CommandsPlaylist["DurationSort"] = "Sort by duration";
    CommandsPlaylist["AlphabeticalSongNameSort"] = "Sort by song name";
    CommandsPlaylist["AlphabeticalAuthorNameSort"] = "Sort by author name";
    CommandsPlaylist["NumberOfReproductionSort"] = "Sort by number of reproductions";
    CommandsPlaylist["Quit"] = "Quit";
})(CommandsPlaylist || (CommandsPlaylist = {}));
//# sourceMappingURL=prompt.js.map