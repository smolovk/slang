const fs = require('fs');

fs.readFile('../test/test.sl', (err, content) => {
    content.indexOf("print(")
});


