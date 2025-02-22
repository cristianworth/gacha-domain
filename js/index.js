"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const dateUtils_1 = require("./dateUtils");
async function updateGameStamina(gameId) {
    const game = await (0, database_1.fetchGameById)(gameId);
    if (game) {
        game.pendingTasks = document.getElementById(`pendingTasks${gameId}`).value;
        game.currentStamina = parseInt(document.getElementById(`newStamina${gameId}`).value);
        game.dateMaxStamina = calculateMaxStaminaDate(game);
        game.maxStaminaAt = (0, dateUtils_1.formatDateToDayHour)(game.dateMaxStamina);
        document.getElementById(`newMaxStaminaAt${gameId}`).textContent = game.maxStaminaAt;
        await (0, database_1.updateGame)(game);
        displayAllGames();
    }
}
function calculateMaxStaminaDate(game) {
    const totalStaminaLeft = game.capStamina - game.currentStamina;
    const howManyMinutesUntilMax = totalStaminaLeft / game.staminaPerMinute;
    const today = new Date();
    const newDate = new Date(today.getTime() + howManyMinutesUntilMax * 60000);
    return newDate;
}
async function displayAllGames() {
    const gameListBody = document.getElementById('gameListBody');
    gameListBody.innerHTML = '';
    const games = await (0, database_1.fetchAllGames)();
    games.forEach(game => {
        const newRow = document.createElement('tr');
        const cells = [
            `<td><img src="${game.img}" alt="${game.description} icon"></td>`,
            `<td>${game.description}</td>`,
            `<td><textarea id="pendingTasks${game.id}">${game.pendingTasks}</textarea></td>`,
            `<td><input type="number" id="newStamina${game.id}" value="${game.currentStamina}"/></td>`,
            `<td><span id="newMaxStaminaAt${game.id}">${game.maxStaminaAt}</span></td>`,
            `<td hidden>${(0, dateUtils_1.formatDate)(game.dateMaxStamina)}</td>`
        ];
        newRow.innerHTML = cells.join('');
        newRow.addEventListener('change', () => updateGameStamina(game.id));
        gameListBody.appendChild(newRow);
    });
}
window.addEventListener('load', () => {
    displayAllGames();
});
