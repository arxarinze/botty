const onMessageHandle = require('../handles/messages');


class DSocket {
    constructor(WSObj) {
        this.ws = WSObj.client;
        this.ws.on("message", (msg) => {
            onMessageHandle(msg, WSObj)
        })
    }

}

module.exports = DSocket