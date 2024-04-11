import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('database.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS birthdays (chat_id INT, user_id INT, birthday_date DATE, UNIQUE(chat_id, user_id))");
});
// Закриття бази даних при завершенні роботи
db.close();
