const fs = require('fs');
const chalk = require('chalk');
let secrets = require("../../../secrets.json")
module.exports = {
name: "instagram login",
usage: `${secrets.configuration.cliName} stalk --instagram Noirr`,
description: "Helps to login for your instagram account",
run: async (username,password) => {
    console.log(username,password)
    if(!username || !password) return console.log("Missing username or password for instagram login")
    let data = {accounts: {instagram: {username,password}}}
    await fs.writeFile("secrets.json",JSON.stringify(data,null,2),()=>{} )
     console.log(chalk.green("Logged in successfully"))
}

}