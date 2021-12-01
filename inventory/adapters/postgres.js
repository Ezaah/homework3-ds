const { Pool } = require("pg")

class PostgresClient {
    constructor(config){
        this._master = new Pool({
            connectionString: config.masterConnectionString
        })
        this._replica = new Pool({
            connectionString: config.replicaConnectionString
        })
    }

    Select(text, values, cb) {
        return this._replica.query(text, values, cb)
    }

    Insert(text, values, cb) {
        return this._master.query(text, values, cb)
    }

    Update(text, values, cb) {
        return this._master.query(text, values, cb)
    }

    Delete(text, values, cb) {
        return this._master.query(text, values, cb)
    }
}

exports.PostgresClient = PostgresClient;


