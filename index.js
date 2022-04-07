#!/usr/bin/env node
const Github =  require("./src/commands/metada/github")
const Instagram = require("./src/commands/metada/instagram")
const axios = require("axios").default
const Help = require("./src/commands/Info/help")
const args = process.argv.slice(2);
const instagramLogin = require("./src/commands/login/instagram")
//console.log(args)
let options = [];
let commands = [];
if(args.map(a => a.includes("--"))){
    console.log("args: ", args)
    commands = args.filter(a => !a.includes("--"));
    options = args.filter(a => a.includes("--"));
    console.log("commands: ", commands)
    console.log("options: ", options)
} else {
    commands = args
}

async function body(){
    if(commands.length == 0) return console.log("Please use a valid command")
    switch(commands[0].toLowerCase()) {
        case "stalk": 
        if(options.length == 0) return console.log("Empty option for stalk command")
        options = options.map(a => a.toLowerCase())
        if(options.includes("--github")) {
            await Github.run(commands[1])
        } else if(options.includes("--instagram")) {
            await Instagram.run(commands[1])
        }
        else {
            console.log("Please use a valid stalk command")
        }
          break;

        case "help":
            if(options && options.length > 0) Help.run(options[0]);
            else Help.run();
            
            break;
        
        case "login": 
            if(options.length == 0) return console.log("Empty option for login command")
            options = options.map(a => a.toLowerCase())
            if(options.includes("--instagram")) { 
                if(!commands[1]  || !commands[2]) return console.log("Please use a valid username and password")
                await instagramLogin.run(commands[1], commands[2])
            }

    } 

}
body()