const fs = require('fs');

const dictionary = require('./modules/dictionary');
const {lexer} = require('./modules/lexer');
const {parser} = require('./modules/parser');


fs.readFile('../test/test.sl', 'utf-8', function (error, content) {
   
    if (error === null) {
        let lexems = lexer(content, dictionary);

        let parsedString = parser(lexems, dictionary);

        console.log(parsedString)
        
        //console.log(JSON.stringify(lexems, null, 4));
    } else {
        console.error(error);        
    }
    
})