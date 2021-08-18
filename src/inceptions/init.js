const path = require('path');
const fs = require('fs');
class Init {

    constructor() {
        this.inceptionObjs = [];
        this.subscriptions = {};
        this.directory = path.join(__dirname)
        fs.readdir(this.directory, (err, files) => {
            files.forEach(file => {
                const temp = file.replace('.js', '').replace('-inception', '');
                if (temp != 'init') {
                    this.inceptions = temp;
                }
            });
            this.loadSubscriptions()
        });
    }

    loadSubscriptions() {
        this.inceptions.map((e) => {
            this.subscriptions[e] = [];
        })
    }



    get count() {
        return this.inceptionObjs.length;
    }

    get inceptions() {
        return this.inceptionObjs
    }

    /**
     * @param {(arg0: any) => void} inception
     */
    set inceptions(inception) {
        console.log(inception)
        this.inceptionObjs.push(inception)
    }

    reset() {
        let incepts = Object.keys(this.subscriptions)
        incepts.map((e) => {
            this.subscriptions[e].map((e1, i) => {
                if (e1.readyState === 3) {
                    this.subscriptions[e].splice(i, 1)
                }
            })
        })
    }
}


module.exports = new Init()