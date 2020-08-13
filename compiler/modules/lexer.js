let lexer = function (content, dictionary) {
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
            
            if (dictionary["function"].indexOf(command) != -1) {
                Object.assign(stringObject, {"function": command});
            } else {
                Object.assign(stringObject, {"undefined_function": command});
            }
            
            let valueGot = copyString.replace(new RegExp(command, "g"), "").replace(/\(/, "").replace(/\)/, "");
            let value = valueGot.split(",")
            value.forEach(element => {
                element.trim();
            });
            
            for(let i in value) {
                if (/\"(.*)\"/gim.test(value[i])) {
                    if (value[i].length === 1){
                        Object.assign(stringObject, {
                            "value": {
                                "num": i,
                                "type": "string",
                                "subtype": "char",
                                "value": value[i]
                            }
                        });
                    } else {
                        Object.assign(stringObject, {
                            "value": {
                                "num": i,
                                "type": "string",
                                "value": value[i].trim()
                            }
                        });
                    }
                } else {
                    if (Number(value[i])) {
                        //int
                        if (Number(value[i]) % 1 === 0) {
                            if(Number(value[i]) > -2147483648 && Number(value[i]) < 2147483648){
                                Object.assign(stringObject, {
                                    "value": {
                                        "num": i,
                                        "type": "int",
                                        "value": Number(value[i])
                                    }});          
                            } else {
                                if (Number(value[i]) > -9223372036854775808 && Number(value[i]) < 9223372036854775808) {
                                    Object.assign(stringObject, {
                                        "value": {
                                            "num": i,
                                            "type": "int",
                                            "subtype": "longint",
                                            "value": Number(value[i])
                                        }});  
                                } else {
                                    Object.assign(stringObject, {
                                        "value": {
                                            "num": i,
                                            "type": "int",
                                            "subtype": "infinity",
                                            "value": Number(value[i])
                                        }});  
                                }
                            }      
                        } else {
                            Object.assign(stringObject, {
                                "value": {
                                    "num": i,
                                    "type": "float",
                                    "value": Number(value[i])
                                }});
                        }

                    } else {
                        Object.assign(stringObject, {
                            "value": {
                                "num": i,
                                "type": "undefined",
                                "value": value[i]
                            }});
                    }
                }
            }
            
            lexems.push(stringObject);
        }
        
    }
    return lexems;
}

module.exports = {lexer}