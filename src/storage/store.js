const mongoose = require("mongoose");

class Datasource {
    constructor() {
        // this.dbUrl = process.env.DB_URL;
        this.dbUrl = process.env.DB_URL;
        console.log(process.env.DB_URL)
    }
    async connect() {
        try {
            const connectionObj = await mongoose.connect(this.dbUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            })
            const ready = connectionObj.connection.readyState //debug tool to check for readiness
            if (ready) {
                console.log(`Connected to ABiTrader DB here`);
            }
        } catch (error) {
            console.log(`Can not connect to DB`);
            console.log(error.message);
        }
    }
}

module.exports = Datasource