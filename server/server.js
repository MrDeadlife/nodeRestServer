require('./config/config');
const express = require('express')
const app = express();
const bodyParser = require('body-parser')

//cada peticion hecha siempre pasa por los middleware
//middleware
//  analizar aplicación / x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    //middleware
    //  analizar aplicación / json
app.use(bodyParser.json())

app.get('/usuario', function(req, res) {
    res.json('Get Usuario')
})

app.post('/usuario', function(req, res) {
    let body = req.body;

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });
    } else {
        res.json({
            persona: body
        });

    }

})
app.put('/usuario/:id', function(req, res) {
    //recibiendo el id y guardandolo 
    let id = req.params.id;
    res.json({
        id
    });
});
app.delete('/usuario', function(req, res) {
    res.json('Delete Usuario')
})

app.listen(process.env.PORT, () => {
    console.log(`Escuchando el puerto ${process.env.PORT}`);
});