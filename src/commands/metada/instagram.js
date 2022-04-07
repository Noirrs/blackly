const insta = require("user-instagram");
const chalk = require("chalk");
let secrets = require("../../../secrets.json");
module.exports = {
  name: "instagram",
  usage: `${secrets.configuration.cliName} stalk --instagram username`,
  description: `Shows instagram account of the user you typed`,
  run: async function instagram(user) {
    if (secrets.accounts && !secrets.accounts.instagram)
      console.log("Please login to instagram first\n" + `${secrets.configuration.cliName} login --instagram username password` );
    console.log(
      secrets.accounts.instagram.username,
      secrets.accounts.instagram.password
    );
    await insta.authenticate(
      secrets.accounts.instagram.username,
      secrets.accounts.instagram.password
    );
    if (!user) return console.log("Empty username");
    try {
      insta.getUserData(user).then(async (userData) => {
        let bio = userData.getBiography();
        let followers = userData.getFollowersCount();
        let following = userData.getFollowingCount();
        let name = userData.getFullName();
        let phone = userData.getBusinessPhoneNumber();
        let category = userData.getBusinessCategoryName();
        let private = userData.isPrivate();
        let verified = userData.isVerified();
        let pp = userData.getHdProfilePicture();
        console.log(pp);
        let usero = {
          followers,
          following,
          name,
          phone,
          category,
          private,
          verified,
          user,
          instagram: `https://instagram.com/${user}`,
        };
        console.table([usero]);
        console.log(chalk.blueBright(`${user}'s bio: ${bio}`));
      });
    } catch (err) {
      console.log("Unknown User");
    }
  },
};
