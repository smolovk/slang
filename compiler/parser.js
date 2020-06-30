//var creator
if (currentString.startsWith("var")) {
    var varName = currentString.replace(/var /gm, "").replace(/=.+/gs, '').trim();
    var varValue = currentString.replace(/var /gm, "").replace(varName, '').replace(/.+=/gs, '').trim()

    if (/[^a-zA-Z0-9]/gm.test(varName)){
        console.error("Unacceptable symbols in variable name: " + varName);
        return;                
    }
    else{
        if(/[0-9]/gm.test(varName[0])){
            console.error("First character of variable name must be non-numeric: " + varName);
            return;                    
        } else {
            console.log(varName + " = " + varValue);
            
        }
    }
}

//print
