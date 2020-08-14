const fs = require('fs');
const {exec} = require("child_process");
const config = require("../config.js")
const dictionary = require('./modules/dictionary');
const {lexer} = require('./modules/lexer');

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
let outFile = process.argv[2].replace(".s", "");

let translate = (lexems) => {

    let compiled = [];

    for (let i in lexems) {
        if (lexems[i].undefined_function !== "") {
            console.error("Compilation error: " + "Undefined function at " + i);
            process.exit()
        } else if (lexems[i].function == "print") {
            compiled.push("\t" + `cout << ${lexems[i].args.join(" << ")} << endl;`);
        } else if (lexems[i].function == "cpp") {
            let commands = [];
            for (arg in lexems[i].args) {
                let argument = lexems[i].args[arg].trim();
                let command = argument.slice(1, -1);
                command += ";";
                commands.push(command);
            };
            //console.log(commands);
            compiled.push("\t" + commands.join("\n\t"));
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
        console.log(`Compiled succesfully to "${outFile}"!\n${stdout}`);
        fs.unlink("compiled.cpp", () => {
            
        })
    });
}



fs.readFile(inFile, 'utf-8', function (error, content) {
   
    if (error === null) {
        let lexems = lexer(content, dictionary);

        //console.log();
        //console.log(JSON.stringify(lexems, null, 4));
        fs.writeFileSync("compiled.cpp", `${starting}\n${translate(lexems).join("\n")}\n${ending}`);
        compile(outFile)

        
    } else {
        console.error(error);        
    }
    
})
