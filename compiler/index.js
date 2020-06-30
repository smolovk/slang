const fs = require('fs');

fs.readFile('../test/test.sl', 'utf-8', function (error, content) { 

    var text = content.replace(/\s\s+/gm, " ");
    var strings = text.split('\n');
    
    for (var i =0; i < strings.length; i++) {
        var currentString = strings[i];
        
        //var creator
        if (currentString.startsWith("var")) {
            var varName = currentString.replace(/var /gm, "").replace(/=.+/gs, '').trim();
            var varValue = currentString.replace(/var /gm, "").replace(varName, '').replace(/.+=/gs, '').trim()

            if (/[^a-zA-Z0-9]/gm.test(varName)){
                console.error("Unacceptable symbols in variable name: " + varName);
                return;                
            }
            else{
                if(/[0-9]/gm.test(varName[0])){
                    console.error("First character of variable name must be non-numeric: " + varName);
                    return;                    
                } else {
                    console.log(varName + " = " + varValue);
                    
                }
            }
        }
    }

});


