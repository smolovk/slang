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

let compile = (lexems) => {

    let compiled = [];

    for (let i in lexems) {
        if (lexems[i].function == "print") {
            compiled.push("\t" + `cout << ${lexems[i].value.value} << endl;`);
        }
    };

    return(compiled)
}


fs.readFile(inFile, 'utf-8', function (error, content) {
   
    if (error === null) {
        let lexems = lexer(content, dictionary);

        //console.log();
        //console.log(JSON.stringify(lexems, null, 4));
        fs.writeFileSync(__dirname + "/compiled.cpp", `${starting}\n${compile(lexems).join("\n")}\n${ending}`)
        console.log(compile(lexems));
    } else {
        console.error(error);        
    }
    
})


//compile to executable with g++
exec("g++ -x c++ " + __dirname + "/compiled.cpp -o " + outFile, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`Compiled succesfully to "${outFile}"!\n${stdout}`);
});


