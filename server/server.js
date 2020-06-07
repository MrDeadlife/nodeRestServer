require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

//cada peticion hecha siempre pasa por los middleware
//middleware
//  analizar aplicación / x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    //middleware
    //  analizar aplicación / json
app.use(bodyParser.json());


//llamamos el archivo usuarios.js donde estan las peticiones
app.use(require('./routes/usuario'));


//coneccion a mongo
/*
mongoose.connect('mongodb://localhost:28017/cafe', (err, res) => {
    if (err) throw err;
    console.log('online')
});
*/

mongoose.connect(process.env.URLDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log('error' + err);
    });


app.listen(process.env.PORT, () => {
    console.log(`Escuchando el puerto ${process.env.PORT}`);
});