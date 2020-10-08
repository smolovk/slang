let lexer = function (content, dictionary) {
    const funcRegexp = /.+(.+)/gs;
    let text = content;
    //.replace(/\s\s+/gm, " ");
    let strings = text.split('\n');
    
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