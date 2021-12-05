const { PostgresClient } = require('./adapters/postgres')
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const client = new PostgresClient({
    masterConnectionString: process.env.POSTGRES_MASTER_CONNECTION_URI,
    replicaConnectionString: process.env.POSTGRES_REPLICA_CONNECTION_URI,
})


app.post('/insertar', async (req, res) =>{
    const {nombre, precio} = req.body;
    await client.Insert("INSERT INTO productos(nombre, precio) values($1, $2)", [nombre, precio],function(err, results) {
        if (err)
            res.send(err);
        else
            res.send(results);
    });
});

app.get('/obtener/:id' , async(req,res)=> {
  const id = req.params.id;
  console.log(id);
  await client.Select("SELECT nombre,precio FROM productos WHERE id=$1", [id],function(err, results) {
    if (err)
        res.send(err);
    else
        res.send(results.rows[0]);
  });
});

app.get('/obtener_todo' , async(req,res)=> {
    await client.Select("SELECT * FROM productos", null,function(err, results) {
      if (err)
          res.send(err);
      else
          res.send(results.rows);
    });
  });


app.listen(8000,() => {
    console.log(`Example app listening at http://localhost:8000`)
})