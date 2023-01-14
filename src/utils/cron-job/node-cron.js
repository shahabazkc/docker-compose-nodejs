var cron = require('node-cron');

function startCronJob() {
    var task = cron.schedule('*/30 * * * * *', () => {
        console.log('Cron job trigger');
    });

    task.start();
}


module.exports = {
    startCronJob
}