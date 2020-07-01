let lexer = function (content, dictionary) {
    let text = content;
    //.replace(/\s\s+/gm, " ");
    let strings = text.split('\n');
    
    let lexems  = [];

    for (let i = 0; i < strings.length; i++) {
        let currentString = strings[i].trim();

        if (currentString !== "") {
            let copyString = currentString;
            let stringObject = {};

            let command = copyString.replace(/\(.+\)/gs, '');   
            
            if (dictionary["function"].indexOf(command) != -1) {
                Object.assign(stringObject, {"function": command});
            } else {
                console.log('undefined');
            }
            
            let value = copyString.replace(new RegExp(command, "g"), "").replace(/\(/, "").replace(/\)/, "");
            
            if (/\"(.*)\"/gim.test(value)) {
                Object.assign(stringObject, {"string": value});
            } else {
                if (Number(value)) {
                    if (Number(value) % 1 === 0) {
                        Object.assign(stringObject, {"int": Number(value)});                
                    } else {
                        Object.assign(stringObject, {"float": Number(value)});
                    }

                } else {
                    Object.assign(stringObject, {"undefined": value});
                }
            }
            
            lexems.push(stringObject);
        }
        
    }


    return lexems;
}

module.exports = {lexer}