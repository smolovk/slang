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

try{
    let inFile = process.cwd() + "/" + process.argv[2]; //file path
    let outFile = process.argv[2].replace(".sl", "");
} catch (e) {
    logger.error('Please, enter the filename')
    return;
}

let inFile = process.cwd() + "/" + process.argv[2]; //file path
let outFile = process.argv[2].replace(".sl", "");



fs.readFile(inFile, 'utf-8', (error, content) => {
   
    if (error === null) {
        let lexems = lexer(content, dictionary, preprocessor);

        fs.writeFileSync("compiled.cpp", `${starting}\n${Translator.translate(lexems, {dict: dictionary, lexer}).join("\n")}\n${ending}`);
        Compiler.compile(outFile, false)
    } else {
        console.error(error);        
    }
    
})
