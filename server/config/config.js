//creamos variables de forma global

//==========================
//PUERTO
//==========================
process.env.PORT = process.env.PORT || 3000;

//=========================
//ENTORNO
//=========================
process.env.NODE_ENV = process.env.NODE_ENV || 'DEV'; //con *process.env.NODE_ENV* obtenemos una lleve y si no existe nos mandaara el mensaje 'DEV'

//=========================
//BASE DE DATOS
//=========================
let ulrDB;

if (process.env.NODE_ENV === 'DEV') {
    ulrDB = 'mongodb://localhost:27017/cafe';
} else {
    ulrDB = process.env.MONGO_URI;
}
//creamos un env en este caso seria URLDB
process.env.URLDB = ulrDB;
/*
//anterior sin ocultar las credenciales
let ulrDB;

if (process.env.NODE_ENV === 'DEV') {
    ulrDB = 'mongodb://localhost:27017/cafe';
} else {
    ulrDB = 'mongodb+srv://kevins:H9VWghMdb4oaap2E@cluster0-ghwth.mongodb.net/cafe'
}
//creamos un env en este caso seria URLDB
process.env.URLDB = ulrDB;*/