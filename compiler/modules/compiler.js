class Compiler {
    constructor(exec) {
        this.exec = exec;
        this.fs = require('fs');
    }

    /**
     * 
     * @param {string} outFile 
     * @param {boolean} unlink=true
     */
    compile(outFile, unlink=true) {
        //compile to executable with g++
        this.exec("g++ -x c++ compiled.cpp -o " + outFile, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`Compiled succesfully to "${outFile}"! ${stdout}`);
            if (unlink) {
                this.fs.unlink("compiled.cpp", () => {
                    
                })
            }
        });
    }
}

module.exports = Compiler;