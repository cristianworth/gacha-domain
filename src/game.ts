class Game {
    constructor(
        public id: number,
        public description: string,
        public abbreviation: string,
        public img: string,
        public capStamina: number,
        public staminaPerMinute: number,
        public currentStamina: number = 0,
        public maxStaminaAt: string = 'not defined',
        public dateMaxStamina: Date = new Date(),
        public pendingTasks: string = ''
    ) {}
}

const allGames: Game[] = [];

allGames.push(new Game(1, 'Genshin Impact', 'GI', 'img/genshin-icon.png', 200, 8));
allGames.push(new Game(2, 'Punishing Gray Raven', 'PGR', 'img/pgr-icon.png', 160, 6));
allGames.push(new Game(3, 'Honkai Star Rail', 'HSR', 'img/star-rail-icon.png', 240, 6));
allGames.push(new Game(4, 'Wuthering Waves', 'WuWa', 'img/wuthering-waves-icon.png', 240, 6));
allGames.push(new Game(5, 'Zenless Zone Zero', 'ZZZ', 'img/zzz-icon.png', 240, 6));
allGames.push(new Game(6, 'Nikke', 'NKK', 'img/nikke-icon.png', 1, 1440));

export { Game, allGames };
