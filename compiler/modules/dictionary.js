module.exports = {
    function: {
        print: function (el) {
            let type = "%";
            
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

            return `\tprintf(${type}, ${el.value});\n`;
        },
    }
};