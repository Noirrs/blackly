const axios = require("axios")
const terminalImage = require('terminal-image');
const got = require('got');
const chalk = require('chalk');
let secrets = require('../../../secrets.json')
module.exports=  {
name: "github",
usage: `${secrets.configuration.cliName} stalk --github username`,
description: "Shows github account of the user you typed",
run: async function (username){
    if(!username) return console.log(chalk.red("Please enter a username!\n") + chalk.blue(`ex: ${secrets.configuration.cliName} stalk --github Noirrs`))
    try {
    if(username) return await axios.get(`https://api.github.com/users/${username}`, {
    }).then(async(response) => {
      //  console.log(response.data)
        
        if(response.data && !response.data.message == "Not found") return console.log("Unknown user")
        const body = await got(response.data.avatar_url).buffer();
        console.log(await terminalImage.buffer(body, {width: 20, height: 20}));
        let {bio,twitter_username,location,name,html_url,company,blog,public_repos,followers,following} = response.data
        let url = blog.includes("https") ? blog : `https://${blog}`
        let all = {twitter: twitter_username,location,name,github: html_url,company,website: url,public_repos,followers,following}
        console.log(` ${username}'s bio: ${chalk.blueBright(bio)}`)
        console.table([all])
    })
  } catch (error) {
    console.log("Unknown User")
  }
    
}
}