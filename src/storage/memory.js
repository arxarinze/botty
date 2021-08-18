class Memory {

    constructor() {
        this.clients = [];
    }

    get count() {
        return this.clients.length;
    }

    addClient(message) {
        let check = true
        this.clients.map((e) => {
            if (e.key == message.key)
                check = false;
        })
        if (check) {
            this.clients.push(message)
        }
        return check
    }

    removeClient(key) {
        if (key != '')
            this.clients.splice(this.findClient(key), 1)
    }

    findClient(key) {
        for (let index = 0; index < this.clients.length; index++) {
            if (this.clients[index].key == key) {
                return index
            }
        }
    }

    reset() {
        this.clients.map((e, i) => {
            if (e.client.readyState === 3) {
                this.clients.splice(i, 1)
            }
        })
    }

}


module.exports = new Memory()