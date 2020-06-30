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
            console.log("variable " + varName + " = " + varValue);            
        }
    }

});


