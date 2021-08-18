const MarketOrder = require("../inceptions/market-order-inception")

//list of inception objects for every initialization
let onMessageHandle = (msg, WSOBJ) => {
    try {
        message = JSON.parse(msg)
        if (validateRequest(['action', 'inception', 'object'], Object.keys(message))) {
            console.log(inception.inceptions)
            console.log(message.inception)
            if (inception.inceptions.includes(message.inception)) {
                WSOBJ.client.send(JSON.stringify({ status: 200, message: "OK" }))
                switch (message.inception) {
                    case 'market-order':
                        new MarketOrder(message, WSOBJ)
                        break;
                }
            }
            else {
                WSOBJ.client.send(JSON.stringify({ status: 403, message: "FORBIDDEN INCEPTION" }))
            }
        }
        else {
            WSOBJ.client.send(JSON.stringify({ status: 400, message: "BAD REQUEST" }))
        }
    } catch (error) {
        WSOBJ.client.send(JSON.stringify({ status: 500, message: "ERROR OCCURED", error }))
    }
}

/** validateRequest
 * Compares two arrays together for same elements returns true if the same and false if different
 * */
let validateRequest = (raw, request) => {
    let msg = true
    raw.forEach(element => {
        if (!request.includes(element)) msg = false
    });

    return msg
}

module.exports = onMessageHandle;