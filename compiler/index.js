const fs = require('fs');
const {exec} = require("child_process");
const config = require("../config.js")
const dictionary = require('./modules/dictionary');
const {lexer} = require('./modules/lexer');
const parser = require("./modules/parser.js");
const preprocessor = require("./modules/preprocessor");
const translator = require("./modules/translator");
const compiler = require("./modules/compiler");
const logger = require("./modules/logger")

const Translator = new translator(parser);
const Compiler = new compiler(exec);


let starting = config.starting;
let ending = config.ending;

let unlink = true;

try{
    console.log(process.argv.indexOf("-d"));
    if(process.argv.indexOf("--debug") !== -1) {
        process.argv.splice(process.argv.indexOf("--debug"), 1);
        unlink = false;
    } else if (process.argv.indexOf("-d") !== -1) {
        process.argv.splice(process.argv.indexOf("-d"), 1);
        unlink = false;
    }
    let inFile = process.cwd() + "/" + process.argv[2]; //file path
    let outFile = process.argv[2].replace(".sl", "");
} catch (e) {
    logger.error('Please, enter the filename')
    return;
}

let inFile = process.cwd() + "/" + process.argv[2]; //file path
let outFile = process.argv[3] || process.argv[2].replace(".sl", "");



fs.readFile(inFile, 'utf-8', (error, content) => {
   
    if (error === null) {
        let lexems = lexer(content, dictionary, preprocessor);

        fs.writeFileSync("compiled.cpp", `${starting}\n${Translator.translate(lexems, {dict: dictionary, lexer}).join("\n")}\n${ending}`);
        Compiler.compile(outFile, unlink)
    } else {
        console.error(error);        
    }
    
})
