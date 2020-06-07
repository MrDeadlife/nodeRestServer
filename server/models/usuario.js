const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//validacion del rol -> no pueda agragar uno no establecido por el admin
let RolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es necesario']
            //required: true -> si no insertan el nombre se enviara el mensaje el nombre es necesario
    },
    password: {
        type: String,
        required: [true, 'La contrasena es necesaria']
    },
    email: {
        type: String,
        required: [true, 'El correo es necesario'],
        unique: true
    },
    img: {
        type: String,
        required: false,
        unique: false
    },
    role: { //rol de usuarios
        type: String,
        default: 'USER_ROLE',
        enum: RolesValidos
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});
usuarioSchema.methods.toJSON = function() {
    let user = this;
    console.log(user);
    //obtenemos objeto del usuario
    //Asi obtenemos todos los valores y metodos de userSchema
    let userObject = user.toObject();
    //creamos el objeto donde no tiene la contrasena para poder mostrarla
    delete userObject.password;
    return userObject;
}

//uniquevalidator sirve para declarar como unicos algunos parametros de la bd 
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });

//exportando modelo , llamandolo Usuario y asignandole toda la conf de usuarioSchema
module.exports = mongoose.model('Usuario', usuarioSchema);