if (/\"(.*)\"/gim.test(value)) {
    if (value.length === 1){
        Object.assign(stringObject, {
            "value": {
                "type": "string",
                "subtype": "char",
                "value": value
            }
        });
    } else {
        Object.assign(stringObject, {
            "value": {
                "type": "string",
                "value": value
            }
        });
    }
} else {
    if (Number(value)) {
        //int
        if (Number(value) % 1 === 0) {
            if(Number(value) > -2147483648 && Number(value) < 2147483648){
                Object.assign(stringObject, {
                    "value": {
                        "type": "int",
                        "value": Number(value)
                    }});          
            } else {
                if (Number(value) > -9223372036854775808 && Number(value) < 9223372036854775808) {
                    Object.assign(stringObject, {
                        "value": {
                            "type": "int",
                            "subtype": "longint",
                            "value": Number(value)
                        }});  
                } else {
                    Object.assign(stringObject, {
                        "value": {
                            "type": "int",
                            "subtype": "infinity",
                            "value": Number(value)
                        }});  
                }
            }      
        } else {
            Object.assign(stringObject, {
                "value": {
                    "type": "float",
                    "value": Number(value)
                }});
        }

    } else {
        Object.assign(stringObject, {
            "value": {
                "type": "undefined",
                "value": value
            }});
    }
}