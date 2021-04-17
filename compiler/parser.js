class Parser {

    constructor (compiled) {
        this.compiled = compiled;
    }

    print(lexem) {
        this.compiled.push("\t" + `cout << ${lexem.args.join(" << ")} << endl;`);
    }

    cpp(lexem) {
        let commands = [];
        for (arg in lexem.args) {
            let argument = lexem.args[arg].trim();
            let command = argument.slice(1, -1);
            commands.push(command);
        };
        //console.log(commands);
        this.compiled.push("\t" + commands.join("\n\t"));
    }
}

module.exports = Parser;
