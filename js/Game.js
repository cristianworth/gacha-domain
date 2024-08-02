class Game {
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

var allGames = [];

allGames.push(new Game(id = 1, description = 'Genshin Impact', abbreviation = 'GI', img = 'img/genshin-icon.png', capStamina = 200, staminaPerMinute = 8));
allGames.push(new Game(id = 2, description = 'Punishing Gray Raven', abbreviation = 'PGR', img = 'img/pgr-icon.png', capStamina = 160, staminaPerMinute = 6));
allGames.push(new Game(id = 3, description = 'Honkai Star Rail', abbreviation = 'HSR', img = 'img/star-rail-icon.png', capStamina = 240, staminaPerMinute = 6));
allGames.push(new Game(id = 4, description = 'Wuthering Waves', abbreviation = 'WuWa', img = 'img/wuthering-waves-icon.png', capStamina = 240, staminaPerMinute = 6));
allGames.push(new Game(id = 5, description = 'Zenless Zone Zero', abbreviation = 'ZZZ', img = 'img/zzz-icon.png', capStamina = 240, staminaPerMinute = 6));
allGames.push(new Game(id = 6, description = 'Nikke', abbreviation = 'NKK', img = 'img/nikke-icon.png', capStamina = 1, staminaPerMinute = 1440));

async function populateInitialData() {
    try {
        const count = await db.games.count();
        if (count === 0) {
            await db.games.bulkAdd(allGames);
            console.log("Initial data populated.");
        }
    } catch (error) {
        console.error("Error populating initial data:", error);
    }
}

async function updateGame(game) {
    try {
        await db.games.update(game.id, game);
        console.log("Jogo atualizado com sucesso ID = ", game.id);
    } catch (error) {
        console.error("Erro ao atualizar o jogo:", error);
    }
}

async function fetchAllGames() {
    try {
        const games = await db.games.orderBy("dateMaxStamina").toArray();
        console.log("Todos os jogos:", games);
        return games;
    } catch (error) {
        console.error("Erro ao buscar todos os jogos:", error);
    }
}

async function fetchGameById(id) {
    try {
        const game = await db.games.get(id);
        console.log("Jogo encontrado:", game);
        return game;
    } catch (error) {
        console.error("Erro ao buscar o jogo pelo ID:", error);
    }
}
