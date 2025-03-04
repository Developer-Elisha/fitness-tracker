const User = require("../models/user");

const cron = require("node-cron");

async function sendEmailsToAllUsers() {
  const users = await User.find();

  for (const user of users) {
    await sendDailyEmail(user.email, user.name);
  }
}

const cronJobRunning = () => {
  cron.schedule("0 0 * * *", () => {
    console.log("Running daily email cron job...");
    sendEmailsToAllUsers();
  });
};

module.exports = cronJobRunning;
