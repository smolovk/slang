class Compiler {
    constructor(exec) {
        this.exec = exec;
    }

    compile(outFile) {
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
            //fs.unlink("compiled.cpp", () => {
                
            //})
        });
    }
}

module.exports = Compiler;