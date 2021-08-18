const ticket = require('../model/ticket-model');
const authService = require('../services/auth-service');
const crypto = require("crypto");
const onCloseHandle = require('../handles/close');
const DSocket = require('./d-socket');
class Authorization {
    static auth = async (req, res) => {
        this.ttoken = ''
        try {
            if (!("authorization" in req.headers)) {
                return res.status(400).send({ status: 400, message: "Bad Request" })
            }
            this.ttoken = req.headers.authorization.split(' ')[1];
            let result = await authService(this.ttoken);
            if (result.status == true) {
                let key = crypto.createHash('sha256').update(result.email + Date.now().toString()).digest('hex')
                let isTicketExist = await ticket.findOne({
                    email: result.email
                })
                if (!isTicketExist) {
                    console.log('sadsad')
                    let ticketObj = await ticket.create({
                        email: result.email,
                        key
                    })
                    console.log(ticketObj)
                    return res.status(200).send({ status: 200, key: ticketObj.key })
                }
                else {
                    let ticketObj = await ticket.findOneAndUpdate(
                        { email: result.email },
                        { $set: { key } },
                        { new: true }
                    )
                    console.log(ticketObj)
                    return res.status(200).send({ status: 200, key: ticketObj.key })
                }

            }
        } catch (error) {
            console.log(error)
            return res.status(500).send({ status: 500, message: "error exists" })
        }
    }

    static validate = async (ws, req) => {
        let key = req.url.split('/')[2]
        let isValid = await ticket.findOne({
            key
        })
        if (isValid) {
            var WSObj = {
                key: isValid.key,
                token: this.ttoken,
                client: ws
            }
            let cont = memory.addClient(WSObj)
            if (cont) {
                let incepts = Object.keys(inception.subscriptions)
                incepts.map((e) => inception.subscriptions[e].push(ws))
                new DSocket(WSObj)
                WSObj.client.on('close', onCloseHandle)
                console.log('Connected')
            }
            else (
                console.log('Possible Duplicate')
            )
        }
    }
}


module.exports = Authorization