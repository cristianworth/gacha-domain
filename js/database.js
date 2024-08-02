const db = new Dexie("gameDatabase");

db.version(1).stores({
    games: 'id, description, abbreviation, img, capStamina, staminaPerMinute, currentStamina, maxStaminaAt, dateMaxStamina'
});

db.version(2).stores({
    games: 'id, description, abbreviation, img, capStamina, staminaPerMinute, currentStamina, maxStaminaAt, dateMaxStamina, pendingTasks'
});

db.open().then(populateInitialData).catch((error) => {
    console.error("Failed to open the database:", error);
});
