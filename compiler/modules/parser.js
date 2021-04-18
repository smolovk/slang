class Parser {

    constructor (compiled) {
        this.compiled = compiled;
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
        let starting = `\tif (${lexems[i].args[0].slice(1, -1)}) {\n`;
        let body = "\t";
        let ending = "\t\n}"

        let bodyArgs = lexems[i].args.slice(1);
        let bodyLex = obj["lexer"](bodyArgs.join("\n"), obj["dict"]);
        let bodyTrs = translate(bodyLex, obj["dict"], obj["lexer"]);

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
