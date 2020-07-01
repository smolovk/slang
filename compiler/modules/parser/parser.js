function parser(lexems, dictionary) {

    let start = '#include <stdio.h>\n\nint main () {\n';
    let current = null;
    let end = '\n\treturn 0;\n\t}';
    
    
    if (lexems && lexems.length !== 0) {
        for (let i = 0; i < lexems.length; i++) {
            let functionName = lexems[i]["function"];
            let valueObj = lexems[i]["value"];

            if (lexems[i]["function"] && dictionary["function"][functionName]){
                let currentFuncion = dictionary["function"][functionName];

                current = currentFuncion(valueObj);
                start = start + current;
            } else {
                console.error(`Function "${functionName}" does not exists!`);
            }
            
        }     
        
        return start + end;

        
    } else {
        console.error("Lexems array can not be empty");
    }
    
}

module.exports = {parser};