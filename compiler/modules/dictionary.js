let {Type} = require('./utils/Type')

module.exports = {
    function: {
        print: function (el) {
            let type = "%";
            let parsedValue = el.value;
            console.log(el);
            

            if (el.type === "int" || el.type === "float") {
                parsedValue = eval(parsedValue);
            } 
            
            if (el.type === "char") type += "c";
            else if (el.type === "string") type += "s";
            else if (el.type === "integer") {
                if (el.subtype === "infinity"){
                    console.error("Integer is too big");
                    return;
                } else {
                    type += "d";
                }
            }
            else if (el.type === "float") type += "f";
            else if (el.type === "undefined") type += "s";
            else {
                console.error('UNKNOWN_TYPE');
                return;                
            }

            return `\tprintf(${type}, ${parsedValue});\n`;
        },
    }
};