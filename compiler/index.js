const fs = require('fs');

const dictionary = require('./modules/dictionary');
const {lexer} = require('./modules/lexer');


fs.readFile('../test/test.s', 'utf-8', function (error, content) {
   
    if (error === null) {
        let lexems = lexer(content, dictionary);

        console.log(JSON.stringify(lexems, null, 4));
    } else {
        console.error(error);        
    }
    
})