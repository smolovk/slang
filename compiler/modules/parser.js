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
        this.compiled.push("\t" + `println!(${lexem.args.join(", ")})`);
    }

    if(lexem) {
        let starting = `\t#[allow(unused_parens)]\n\tif (${lexem.args[0].slice(1, -1)}) {\n`;
        let body = "\t";
        let ending = "\n\t}"

        let bodyArgs = lexem.args.slice(1);
        let bodyLex = this.lexer(bodyArgs.join("\n"), this.dict, this.preprocessor);
        let bodyTrs = this.translator.translate(bodyLex, this.dict, this.lexer);

        body += bodyTrs.join(";\n\t");
        body += ";";
        this.compiled.push(starting + body + ending)
    }

    else(lexem) {
        let starting = `\telse {\n`;
        let body = "\t";
        let ending = "\n\t}"

        let bodyLex = this.lexer(lexem.args.join("\n"), this.dict, this.preprocessor);
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

    stoi(lexem) {
        this.compiled.push("\t" + `auto ${lexem.args[1]} = stoi(${lexem.args[0]});`);
    }

    pass(lexem) {
        this.compiled.push(";")
    }
}

module.exports = Parser;
