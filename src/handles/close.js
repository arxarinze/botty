const memory = require('../storage/memory');
let onCloseHandle = function (code, reason) {
    // memory.removeClient(reason)
    memory.reset()
    inception.reset()
}

module.exports = onCloseHandle;