"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
exports.populateInitialData = populateInitialData;
exports.updateGame = updateGame;
exports.fetchAllGames = fetchAllGames;
exports.fetchGameById = fetchGameById;
const dexie_1 = __importDefault(require("dexie"));
class GameDatabase extends dexie_1.default {
    games;
    constructor() {
        super("gameDatabase");
        this.version(1).stores({
            games: 'id, description, abbreviation, img, capStamina, staminaPerMinute, currentStamina, maxStaminaAt, dateMaxStamina'
        });
        this.version(2).stores({
            games: 'id, description, abbreviation, img, capStamina, staminaPerMinute, currentStamina, maxStaminaAt, dateMaxStamina, pendingTasks'
        });
        this.games = this.table("games");
    }
}
const db = new GameDatabase();
exports.db = db;
db.open().then(populateInitialData).catch((error) => {
    console.error("Failed to open the database:", error);
});
const initialGames = [
    { id: 1, description: 'Genshin Impact', abbreviation: 'GI', img: 'img/genshin-icon.png', capStamina: 200, staminaPerMinute: 8, currentStamina: 0, maxStaminaAt: 'not defined', dateMaxStamina: new Date(), pendingTasks: '' },
    { id: 2, description: 'Punishing Gray Raven', abbreviation: 'PGR', img: 'img/pgr-icon.png', capStamina: 160, staminaPerMinute: 6, currentStamina: 0, maxStaminaAt: 'not defined', dateMaxStamina: new Date(), pendingTasks: '' },
    { id: 3, description: 'Honkai Star Rail', abbreviation: 'HSR', img: 'img/star-rail-icon.png', capStamina: 240, staminaPerMinute: 6, currentStamina: 0, maxStaminaAt: 'not defined', dateMaxStamina: new Date(), pendingTasks: '' },
    { id: 4, description: 'Wuthering Waves', abbreviation: 'WuWa', img: 'img/wuthering-waves-icon.png', capStamina: 240, staminaPerMinute: 6, currentStamina: 0, maxStaminaAt: 'not defined', dateMaxStamina: new Date(), pendingTasks: '' },
    { id: 5, description: 'Zenless Zone Zero', abbreviation: 'ZZZ', img: 'img/zzz-icon.png', capStamina: 240, staminaPerMinute: 6, currentStamina: 0, maxStaminaAt: 'not defined', dateMaxStamina: new Date(), pendingTasks: '' },
    { id: 6, description: 'Nikke', abbreviation: 'NKK', img: 'img/nikke-icon.png', capStamina: 1, staminaPerMinute: 1440, currentStamina: 0, maxStaminaAt: 'not defined', dateMaxStamina: new Date(), pendingTasks: '' }
];
async function populateInitialData() {
    try {
        const count = await db.games.count();
        if (count === 0) {
            await db.games.bulkAdd(initialGames);
            console.log("Initial data populated.");
        }
    }
    catch (error) {
        console.error("Error populating initial data:", error);
    }
}
async function updateGame(game) {
    try {
        await db.games.update(game.id, game);
        console.log("Game updated successfully, ID =", game.id);
    }
    catch (error) {
        console.error("Error updating the game:", error);
    }
}
async function fetchAllGames() {
    try {
        const games = await db.games.orderBy("dateMaxStamina").toArray();
        console.log("All games:", games);
        return games;
    }
    catch (error) {
        console.error("Error fetching all games:", error);
        return [];
    }
}
async function fetchGameById(id) {
    try {
        const game = await db.games.get(id);
        console.log("Game found:", game);
        return game;
    }
    catch (error) {
        console.error("Error fetching the game by ID:", error);
        return undefined;
    }
}
