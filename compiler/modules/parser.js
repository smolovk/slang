class Parser {

    constructor (compiled) {
        this.compiled = compiled;
        this.lexer = require('./lexer').lexer;
        this.dict = require('./dictionary');
        this.preprocessor = require('./preprocessor');
        this.Translator = require('./translator');
        this.translator = new this.Translator()
    }

    print(lexem) {
        this.compiled.push("\t" + `cout << ${lexem.args.join(" << ")} << endl;`);
    }

    cpp(lexem) {
        let commands = [];
        for (let arg in lexem.args) {
            let argument = lexem.args[arg].trim();
            let command = argument.slice(1, -1);
            commands.push(command);
        };
        //console.log(commands);
        this.compiled.push("\t" + commands.join("\n\t"));
    }

    if(lexem) {
        let starting = `\tif (${lexem.args[0].slice(1, -1)}) {\n`;
        let body = "\t";
        let ending = "\t\n}"

        let bodyArgs = lexem.args.slice(1);
        let bodyLex = this.lexer(bodyArgs.join("\n"), this.dict, this.preprocessor);
        let bodyTrs = this.translator.translate(bodyLex, this.dict, this.lexer);

        body += bodyTrs.join(";\n\t");
        body += ";";
        this.compiled.push(starting + body + ending)
    }

    in(lexem) {
        this.compiled.push("\t" + `cout << ${lexem.args[0]};
                cin >> in;
                cout << endl;`);
    }

    var(lexem) {
        this.compiled.push("\t" + `auto ${lexem.args[0]} = ${lexem.args[1]};`);
    }
}

module.exports = Parser;
