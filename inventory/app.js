const { PostgresClient } = require('./adapters/postgres')

const client = new PostgresClient({
    masterConnectionString: process.env.POSTGRES_MASTER_CONNECTION_URI,
    replicaConnectionString: process.env.POSTGRES_REPLICA_CONNECTION_URI,
})


// ALL QUERIES ARE ASYNC.

// Example Insert query, goes through postgres
// client.Insert("CREATE TABLE testing (id SERIAL PRIMARY KEY, name VARCHAR(100))").then(res => console.log(res).catch(e => console.error(e.stack)))
// client.Insert("INSERT INTO testing (name) values ($1)", ["Test Name"]).then(res => console.log(res)).catch(e => console.error(e.stack))

// Example Select query, goes through postgres-replica
client.Select("SELECT name FROM testing WHERE id=$1", [1]).then(res => console.log(res.rows[0])).catch(e => console.error(e.stack))
