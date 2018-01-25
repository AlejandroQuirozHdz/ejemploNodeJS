const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    edad: {
        type:String,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);