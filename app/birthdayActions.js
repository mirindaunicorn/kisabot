import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('database.db');

function addBirthday(bot, chatId, userId, birthdayDate) {
    let addStmt = db.prepare("INSERT or REPLACE INTO birthdays (chat_id, user_id, birthday_date) VALUES (?, ?, ?)");
    addStmt.run(chatId, userId, birthdayDate);
    addStmt.finalize();
}

function getAllBirthdays(bot, chatId) {
    const getStmt = db.prepare("SELECT * FROM birthdays WHERE chat_id = ?");

    getStmt.all(chatId, (err, rows) => {
        if (err) {
            bot.sendMessage(chatId, 'щось пішло не так, спробуй ще раз....');
            return;
        }

        if (rows.length > 0) {
            const birthdays = [];
            const fetchBirthdayInfo = async () => {
                for (const row of rows) {
                    try {
                        const chat = await bot.getChat(row.user_id);
                        const member = chat.username;
                        const birthday = row.birthday_date;

                        if (member && birthday) {
                            birthdays.push([birthday, '@' + member]);
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }

                bot.sendMessage(chatId, 'дні народження котиків: ' + birthdays);
            };
            fetchBirthdayInfo();
        } else {
            bot.sendMessage(chatId, 'а у вас нема днів народжень.....');
        }
    });
}

function birthdayReminder(bot) {
    let chatIds = db.prepare("SELECT DISTINCT chat_id FROM birthdays").run().all();
    console.log(chatIds);
    
    // for (const chatId of chatIds) {
    //     const getStmt = db.prepare("SELECT * FROM birthdays WHERE chat_id = ?");
    //
    //     getStmt.all(chatId, (err, rows) => {
    //         if (err || rows.length === 0) {
    //             return;
    //         }
    //
    //         for (const row of rows) {
    //             try {
    //                 const chat = bot.getChat(row.user_id);
    //                 const member = chat.username;
    //                 const birthday = row.birthday_date;
    //
    //                 if (member && birthday) {
    //                     bot.sendMessage(chatId, `Сьогодні день народження у ${member}!`);
    //                 }
    //             } catch (error) {
    //                 console.error(error);
    //             }
    //         }
    //     });
    // }
}

export {
    addBirthday,
    getAllBirthdays,
    birthdayReminder
};
