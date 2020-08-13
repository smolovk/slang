const fs = require('fs');
const config = require("../config.js")
const dictionary = require('./modules/dictionary');
const {lexer} = require('./modules/lexer');

let starting = config.starting;
let ending = config.ending;


let compile = (lexems) => {

    let compiled = [];

    for (let i in lexems) {
        if (lexems[i].function == "print") {
            compiled.push("\t" + `cout << ${lexems[i].value.value} << endl;`);
        }
    };

    return(compiled)
}


fs.readFile(__dirname + "/" + 'test.s', 'utf-8', function (error, content) {
   
    if (error === null) {
        let lexems = lexer(content, dictionary);

        //console.log();
        //console.log(JSON.stringify(lexems, null, 4));
        fs.writeFileSync("compiled.cpp", `${starting}\n${compile(lexems).join("\n")}\n${ending}`)
        console.log(compile(lexems));
    } else {
        console.error(error);        
    }
    
})


