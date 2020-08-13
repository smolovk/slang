let lexer = function (content, dictionary) {
    let text = content;
    //.replace(/\s\s+/gm, " ");
    let strings = text.split('\n');
    
    let lexems  = [];

    for (let i = 0; i < strings.length; i++) {
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
            
            if (/\"(.*)\"/gim.test(value[0])) {
                if (value[0].length === 1){
                    Object.assign(stringObject, {
                        "value": {
                            "type": "string",
                            "subtype": "char",
                            "value": value[0]
                        }
                    });
                } else {
                    Object.assign(stringObject, {
                        "value": {
                            "type": "string",
                            "value": value[0].trim()
                        }
                    });
                }
            } else {
                if (Number(value[0])) {
                    //int
                    if (Number(value[0]) % 1 === 0) {
                        if(Number(value[0]) > -2147483648 && Number(value[0]) < 2147483648){
                            Object.assign(stringObject, {
                                "value": {
                                    "type": "int",
                                    "value": Number(value[0])
                                }});          
                        } else {
                            if (Number(value[0]) > -9223372036854775808 && Number(value[0]) < 9223372036854775808) {
                                Object.assign(stringObject, {
                                    "value": {
                                        "type": "int",
                                        "subtype": "longint",
                                        "value": Number(value[0])
                                    }});  
                            } else {
                                Object.assign(stringObject, {
                                    "value": {
                                        "type": "int",
                                        "subtype": "infinity",
                                        "value": Number(value[0])
                                    }});  
                            }
                        }      
                    } else {
                        Object.assign(stringObject, {
                            "value": {
                                "type": "float",
                                "value": Number(value[0])
                            }});
                    }

                } else {
                    Object.assign(stringObject, {
                        "value": {
                            "type": "undefined",
                            "value": value[0]
                        }});
                }
            }
            
            lexems.push(stringObject);
        }
        
    }


    return lexems;
}

module.exports = {lexer}