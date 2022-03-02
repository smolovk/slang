class Logger {
    error(msg) {
        console.error("\x1b[0m", "\x1b[1m\x1b[41m", "ERROR", "\x1b[0m\x1b[40m\x1b[31m", msg);
        process.exit();
    }

    warn(msg) {
        console.warn("\x1b[0m", "\x1b[1m\x1b[43m", "WARN", "\x1b[0m\x1b[40m\x1b[33m", msg);
    }

    log(msg) {
        console.log("\x1b[0m", "\x1b[1m\x1b[44m", "LOG", "\x1b[0m\x1b[40m\x1b[34m", msg);
    }

    success(msg) {
        console.log("\x1b[0m", "\x1b[1m\x1b[42m", "SUCCESS", "\x1b[0m\x1b[40m\x1b[32m", msg)
    }
        
}

module.exports = new Logger();