"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.promptRemovePlaylist = exports.promptAddPlaylist = exports.promptSelectPlaylist = exports.promptRemoveSong = exports.promptAddSong = exports.promptUserPlaylist = exports.promptUser = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const classes_1 = require("./classes");
const database_1 = require("./database");
let database = new database_1.DataBase();
var Commands;
(function (Commands) {
    Commands["SelectPlatlist"] = "Select playlist";
    Commands["AddPlaylist"] = "Add playlist";
    Commands["RemovePlaylist"] = "Remove playlist";
    Commands["Quit"] = "Quit";
})(Commands || (Commands = {}));
var CommandsPlaylist;
(function (CommandsPlaylist) {
    CommandsPlaylist["AddSong"] = "Add song to a playlist";
    CommandsPlaylist["RemoveSong"] = "Remove song from a playlist";
    CommandsPlaylist["Quit"] = "Quit";
})(CommandsPlaylist || (CommandsPlaylist = {}));
function promptUser() {
    return __awaiter(this, void 0, void 0, function* () {
        let answers = {
            command: Commands.SelectPlatlist,
        };
        while (answers["command"] != Commands.Quit) {
            console.clear();
            database.viewPlaylists();
            answers = yield inquirer_1.default.prompt({
                type: "list",
                name: "command",
                message: "Choose option",
                choices: Object.values(Commands)
            });
            switch (answers["command"]) {
                case Commands.SelectPlatlist:
                    yield promptSelectPlaylist();
                    break;
                case Commands.AddPlaylist:
                    yield promptAddPlaylist();
                    break;
                case Commands.RemovePlaylist:
                    yield promptRemovePlaylist();
                    break;
            }
        }
    });
}
exports.promptUser = promptUser;
function promptUserPlaylist(playlistName) {
    return __awaiter(this, void 0, void 0, function* () {
        let answers = {
            commandPlaylist: CommandsPlaylist.AddSong,
        };
        while (answers["commandPlaylist"] != CommandsPlaylist.Quit) {
            //console.clear();
            database.viewPlaylist(playlistName);
            const answers = yield inquirer_1.default.prompt({
                type: "list",
                name: "commandPlaylist",
                message: "Choose option",
                choices: Object.values(CommandsPlaylist)
            });
            switch (answers["commandPlaylist"]) {
                case CommandsPlaylist.AddSong:
                    yield promptAddSong(playlistName);
                    break;
                case CommandsPlaylist.RemoveSong:
                    yield promptRemoveSong(playlistName);
                    break;
                case CommandsPlaylist.Quit:
                    break;
            }
            if (answers["commandPlaylist"] === CommandsPlaylist.Quit)
                break;
        }
    });
}
exports.promptUserPlaylist = promptUserPlaylist;
function promptAddSong(playlistName) {
    return __awaiter(this, void 0, void 0, function* () {
        console.clear();
        const nameSong = yield inquirer_1.default.prompt({
            type: "input",
            name: "nameSong",
            message: "Enter name of the song:",
        });
        if (database.findSong(nameSong["nameSong"]) != -1) {
            database.setSongToPlaylist(nameSong["nameSong"], playlistName);
            database.updateDurationPlaylist(playlistName);
        }
        else
            console.log("The song doesnt exists");
    });
}
exports.promptAddSong = promptAddSong;
function promptRemoveSong(playlistName) {
    return __awaiter(this, void 0, void 0, function* () {
        console.clear();
        const nameSong = yield inquirer_1.default.prompt({
            type: "input",
            name: "nameSong",
            message: "Enter name of the song:",
        });
        database.removeSongFromPlaylist(playlistName, nameSong["nameSong"]);
    });
}
exports.promptRemoveSong = promptRemoveSong;
function promptSelectPlaylist() {
    return __awaiter(this, void 0, void 0, function* () {
        console.clear();
        const playlistName = yield inquirer_1.default.prompt({
            type: "input",
            name: "playlistName",
            message: "Enter name of the playlist: ",
        });
        yield promptUserPlaylist(playlistName["playlistName"]);
    });
}
exports.promptSelectPlaylist = promptSelectPlaylist;
function promptAddPlaylist() {
    return __awaiter(this, void 0, void 0, function* () {
        console.clear();
        const playlistName = yield inquirer_1.default.prompt({
            type: "input",
            name: "playlistName",
            message: "Enter name of the playlist: ",
        });
        let newPlaylist = new classes_1.Playlist(playlistName["playlistName"], [], 0, []);
        database.setPlaylist(newPlaylist);
    });
}
exports.promptAddPlaylist = promptAddPlaylist;
function promptRemovePlaylist() {
    return __awaiter(this, void 0, void 0, function* () {
        console.clear();
        const playlistName = yield inquirer_1.default.prompt({
            type: "input",
            name: "playlistName",
            message: "Enter name of the playlist: ",
        });
        database.removePlaylist(playlistName["playlistName"]);
    });
}
exports.promptRemovePlaylist = promptRemovePlaylist;
//# sourceMappingURL=prompt.js.map