const fs = require('fs');

fs.readFile('../test/test.sl', 'utf-8', function (error, content) { 

    var text = content.replace(/\s\s+/gm, " ");
    var strings = text.split('\n');

    var lexems = [];

    
    for (var i =0; i < strings.length; i++) {
        var currentString = strings[i];

        
        if (currentString !== "") {
            var stringObject = {};

            if (currentString.startsWith("print")){
                stringObject['id'] = 'print';
                var printValue = currentString.replace(/print\(/gs, "").replace(/\)/gs, "");
                if (/".+"/gs.test(printValue)){
                    stringObject['string'] = printValue;
                } else {
                    stringObject['number'] = printValue;
                }
            }

            lexems.push(stringObject);
        }

    }

    console.log(JSON.stringify(lexems, null, 4));
    

});


