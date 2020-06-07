const express = require('express');
const bcrypt = require('bcrypt');
//libreria de helpers js
const _ = require('underscore');
const Usuario = require('../models/usuario');

const app = express();

app.get('/usuario', function(req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);
    //trae todos los registros de la coleccion pero tambien puede buscarlos por caracteristica o con  Usuario.find({ name:'test1'}) o {},'nombre email'
    Usuario.find({ state: true }, 'name email')
        .skip(desde) //salta los primeros 5
        .limit(limite) //muestra solo 5
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            //el count resive la misma condicion del .find para contarlos de la misma manera
            Usuario.count({ state: true }, (err, conteoUsuarios) => {
                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteoUsuarios
                })
            })
        });

    //res.json('Get Usuario')
})

app.post('/usuario', function(req, res) {
    //En el body estan guardados el nombre, email, img, etc que manda el usuario
    let body = req.body;
    let usuario = new Usuario({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10), //hash de forma sincrona .hashsync | 
        role: body.role
    });
    //callback
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        //borramos el contra de la respuesta para no mostrarla de nuevo
        //  usuarioDB.password = null;
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });
})
app.put('/usuario/:id', function(req, res) {
    //recibiendo el id y guardandolo 
    let id = req.params.id;
    //_  => underscore
    //.pick() permite validar cuales objetos se pueden modificar
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'state']);
    //{New: true} -> regresa el objeto actualizado en la respuesta del put
    //runValidators: true para agregar validaciones
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //retorna un status 200 por defecto mostrando el json 
        res.json({
            ok: true,
            usuario: usuarioDB
        });

    })
});
app.delete('/usuario/:id', function(req, res) {

    //objeto de lo que queremos cambiar, en este caso solo seria el estado de google de true a false
    let id = req.params.id;
    let cambiaEstado = {
        stade: false
    };
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioborrado) => {
        //reciviendo un posible error
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!usuarioborrado) {

            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Oops! usuario no encontrado'
                }
            })


        }
        res.json({
            status: true,
            usuario: usuarioborrado
        })

    });
});

/*Usuario.findByIdAndRemove(id, (err, usuarioborrado) => {
//recibiendo un posible error
if (err) {
    return res.status(400).json({
        ok: false,
        err
    });
};

if (!usuarioborrado) {

    return res.status(400).json({
        ok: false,
        error: {
            message: 'Oops! usuario no encontrado'
        }
    })


}
res.json({
    status: true,
    usuario: usuarioborrado
})

});

});*/

module.exports = app;