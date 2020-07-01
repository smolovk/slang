let Type = function (variable) {
    if (typeof variable === "number") {
        if (variable % 1 === 0) {
            return "int";
        } else {
            return "float";
        }
    }

    else if (typeof variable === "string") {
        if (variable.length === 1) {
            return "char";
        } else {
            return "string";
        }
    }

    else {
        console.error(`Incorrect type of variable ${variable}`);    
    }
};

module.exports = {Type};