class Preprocessor {
    constructor(fs) {
        this.fs = fs;
    }

    include(filename) {
        const content = this.fs.readFileSync(filename, 'utf-8');
        let result = [];
        result.push(content.split('\n'));

        return result;
    }
}

module.exports = Preprocessor;