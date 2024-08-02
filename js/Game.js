"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allGames = exports.Game = void 0;
class Game {
    id;
    description;
    abbreviation;
    img;
    capStamina;
    staminaPerMinute;
    currentStamina;
    maxStaminaAt;
    dateMaxStamina;
    pendingTasks;
    constructor(id, description, abbreviation, img, capStamina, staminaPerMinute, currentStamina = 0, maxStaminaAt = 'not defined', dateMaxStamina = new Date(), pendingTasks = '') {
        this.id = id;
        this.description = description;
        this.abbreviation = abbreviation;
        this.img = img;
        this.capStamina = capStamina;
        this.staminaPerMinute = staminaPerMinute;
        this.currentStamina = currentStamina;
        this.maxStaminaAt = maxStaminaAt;
        this.dateMaxStamina = dateMaxStamina;
        this.pendingTasks = pendingTasks;
    }
}
exports.Game = Game;
const allGames = [];
exports.allGames = allGames;
allGames.push(new Game(1, 'Genshin Impact', 'GI', 'img/genshin-icon.png', 200, 8));
allGames.push(new Game(2, 'Punishing Gray Raven', 'PGR', 'img/pgr-icon.png', 160, 6));
allGames.push(new Game(3, 'Honkai Star Rail', 'HSR', 'img/star-rail-icon.png', 240, 6));
allGames.push(new Game(4, 'Wuthering Waves', 'WuWa', 'img/wuthering-waves-icon.png', 240, 6));
allGames.push(new Game(5, 'Zenless Zone Zero', 'ZZZ', 'img/zzz-icon.png', 240, 6));
allGames.push(new Game(6, 'Nikke', 'NKK', 'img/nikke-icon.png', 1, 1440));
