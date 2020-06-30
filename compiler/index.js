const fs = require('fs');

fs.readFile('../test/test.sl', 'utf-8', function (error, content) { 
    var text = content.replace(/\s\s+/gm);
    var strings = text.split('\n');
    console.log(strings);
    
});


