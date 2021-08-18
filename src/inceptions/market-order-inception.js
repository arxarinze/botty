const mongoose = require("mongoose");
const OrderModel = require("../model/order-model");
const axios = require("axios")
class MarketOrder {
    constructor(incept, ws) {
        this.ws = ws;
        this.incept = incept //collects the incept object

        this.handleActions(this.incept.action)

    }

    async getAllMarketOrders(body) {
        const connectionObj = await mongoose.connect(process.env.DB_URL_TRADER, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        let or = connectionObj.model('order');
        const orders = await or.find(
            {
                isActive: true,
                status: "OPEN",
                currentAmount: { $gt: 0 },
                maxAmount: { $gt: 0 },
            },
            {},
            { sort: { createdAt: -1 } },
            function (err, post) { }
        );

        console.log(orders)

        return {
            orders: orders,
        };
    }

    async handleActions(action) {
        switch (action) {
            case 'load':
                this.pushToAll(JSON.stringify(await this.getAllMarketOrders(this.incept.object.body)))
                break;
            case 'create':
                this.pushToAll(JSON.stringify(await this.getAllMarketOrders(this.incept.object.body)))
                break;
        }

    }


    // pushToAllIncepts(incept, msgObj) {
    //     inception.subscription[incept].map((ws) => {
    //         ws.send(msgObj)
    //     })
    // }
    pushToAll(msgObj) {
        inception.subscriptions['market-order'].map((ws) => {
            ws.send(msgObj)
        })
    }
}

module.exports = MarketOrder