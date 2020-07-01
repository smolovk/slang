function parser(lexems, dictionary) {
    
    if (lexems && lexems.length !== 0) {
        for (let i = 0; i < lexems.length; i++) {

            if (lexems[i]["function"]){
                let functionName = lexems[i]["function"];
                let valueObj = lexems[i]["value"];

                let currentFuncion = dictionary["function"][functionName]
                
                if (currentFuncion){
                    currentFuncion(valueObj.value)
                } else {
                    console.error(`Function "${functionName}" does not exists!`);                
                }
            } else {
                console.error(`Function "${functionName}" does not exists!`);
            }
            
        }        
    } else {
        console.error("Lexems array can not be empty");
    }
    
}

module.exports = {parser};