import schedule from 'node-schedule';

import {birthdayReminder} from './app/birthdayActions.js';
import {bot} from './app.js';

const scheduledTask = schedule.scheduleJob('*/5 * * * *', () => {
    birthdayReminder(bot);
});
