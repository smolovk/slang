const fs = require('fs');

const lexer = (content, dictionary, preprocessor) => {
    const Preprocessor = new preprocessor(fs);
    const funcRegexp = /.+(.+)/gs;
    let text = content;
    //.replace(/\s\s+/gm, " ");
    let strings = text.split('\n');
    
    for (let str in strings) {
        if (strings[str].startsWith("#include")) {
            console.log(1);
            let currentString = strings[str].trim();
            let copyString = currentString;
            let command = copyString.replace(/\(.+\)/gs, '');
            let argsGot = copyString.slice(command.length).slice(1, -1);
            let args = argsGot.split(",");
            let incl = Preprocessor.include(args[0])[0];
            incl.forEach((e) => {
                strings.push(e);
            })
        }
    }
    
    let lexems  = [];
    for (let i in strings) {
        let currentString = strings[i].trim();
        

        if (currentString !== "" && !currentString.startsWith("//")) {
            let copyString = currentString;
            let stringObject = {};

            let command = copyString.replace(/\(.+\)/gs, '');
            
            if (dictionary["function"].indexOf(command.trim()) !== -1) {
                Object.assign(stringObject, {"function": command.trim()});
                
            } else {
                Object.assign(stringObject, {"undefined_function": true, "function": command});
            }
            
            //let argsGot = copyString.replace(new RegExp(command, "g"), "").slice(1, -1);
            let argsGot = copyString.slice(command.length).slice(1, -1);
            let args = argsGot.split(",");
            args.forEach(element => {
                element.trim();
            });
            
            for (let i in args) {
                    Object.assign(stringObject, {
                        "args": args
                    })
                }
            lexems.push(stringObject);
        }
        
    }
    return lexems;
}

module.exports = {lexer}