import { fetchGameById, updateGame, fetchAllGames, Game } from './database';
import { formatDateToDayHour, formatDate } from './dateUtils';

async function updateGameStamina(gameId: number) {
    const game = await fetchGameById(gameId);

    if (game) {
        game.pendingTasks = (document.getElementById(`pendingTasks${gameId}`) as HTMLTextAreaElement).value;
        game.currentStamina = parseInt((document.getElementById(`newStamina${gameId}`) as HTMLInputElement).value);
        game.dateMaxStamina = calculateMaxStaminaDate(game);
        game.maxStaminaAt = formatDateToDayHour(game.dateMaxStamina);

        (document.getElementById(`newMaxStaminaAt${gameId}`) as HTMLSpanElement).textContent = game.maxStaminaAt;

        await updateGame(game);
        displayAllGames();
    }
}

function calculateMaxStaminaDate(game: Game): Date {
    const totalStaminaLeft = game.capStamina - game.currentStamina;
    const howManyMinutesUntilMax = totalStaminaLeft / game.staminaPerMinute;
    const today = new Date();
    const newDate = new Date(today.getTime() + howManyMinutesUntilMax * 60000);
    return newDate;
}

async function displayAllGames() {
    const gameListBody = document.getElementById('gameListBody')!;
    gameListBody.innerHTML = '';

    const games = await fetchAllGames();

    games.forEach(game => {
        const newRow = document.createElement('tr');

        const cells = [
            `<td><img src="${game.img}" alt="${game.description} icon"></td>`,
            `<td>${game.description}</td>`,
            `<td><textarea id="pendingTasks${game.id}">${game.pendingTasks}</textarea></td>`,
            `<td><input type="number" id="newStamina${game.id}" value="${game.currentStamina}"/></td>`,
            `<td><span id="newMaxStaminaAt${game.id}">${game.maxStaminaAt}</span></td>`,
            `<td hidden>${formatDate(game.dateMaxStamina)}</td>`
        ];

        newRow.innerHTML = cells.join('');
        newRow.addEventListener('change', () => updateGameStamina(game.id));
        gameListBody.appendChild(newRow);
    });
}

window.addEventListener('load', () => {
    displayAllGames();
});
