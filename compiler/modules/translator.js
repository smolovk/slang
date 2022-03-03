class Translator {
    constructor(parser) {
        this.parser = require('./parser');
    }

    translate(lexems) {

        let compiled = [];

        this.Parser = new this.parser(compiled);
    
        for (let i in lexems) {
            //functions
            if (lexems[i].function == "print") {
                this.Parser.print(lexems[i]);
            } else if (lexems[i].function == "cpp") {
                this.Parser.cpp(lexems[i]);
            } else if (lexems[i].function == "var") {      
                this.Parser.var(lexems[i]);
            } else if (lexems[i].function == "in") {
                this.Parser.in(lexems[i])
            } else if (lexems[i].function === "if") {
                this.Parser.if(lexems[i]);
            } else if (lexems[i].function === "stoi") {
                this.Parser.stoi(lexems[i]);
            } 
        };
        return(compiled)
    }
}

module.exports = Translator;