const fs = require('fs');
const {exec} = require("child_process");
const config = require("../config.js")
const dictionary = require('./modules/dictionary');
const {lexer} = require('./modules/lexer');
const parser = require("./parser.js");


let starting = config.starting;
let ending = config.ending;

try{
    let inFile = process.cwd() + "/" + process.argv[2]; //file path
    let outFile = process.argv[2].replace(".s", "");
} catch (e) {
    console.error("Please, enter the filename");
    return;
}

let inFile = process.cwd() + "/" + process.argv[2]; //file path
let outFile = process.argv[2].replace(".slang", "");

let translate = (lexems, obj) => {

    let compiled = [];

    const Parser = new parser(compiled);

    for (let i in lexems) {
        //functions
        if (lexems[i].function == "print") {
            Parser.print(lexems[i]);
        } else if (lexems[i].function == "cpp") {
            Parser.cpp(lexems[i]);
        } else if (lexems[i].function == "var") {      
            compiled.push("\t" + `auto ${lexems[i].args[0]} = ${lexems[i].args[1]};`)
        } else if (lexems[i].function == "in") {
            compiled.push("\t" + `cout << ${lexems[i].args[0]};
                cin >> in;
                cout << endl;`)
        } else if (lexems[i].function === "if") {
            Parser.if(lexems[i]);
        } 
    };
    return(compiled)
}

let compile = (outFile) => {
    //compile to executable with g++
    exec("g++ -x c++ compiled.cpp -o " + outFile, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`Compiled succesfully to "${outFile}"! ${stdout}`);
        //fs.unlink("compiled.cpp", () => {
            
        //})
    });
}



fs.readFile(inFile, 'utf-8', function (error, content) {
   
    if (error === null) {
        let lexems = lexer(content, dictionary);

        //console.log();
        //console.log(JSON.stringify(lexems, null, 4));
        fs.writeFileSync("compiled.cpp", `${starting}\n${translate(lexems, {dict: dictionary, lexer}).join("\n")}\n${ending}`);
        compile(outFile)

        
    } else {
        console.error(error);        
    }
    
})
