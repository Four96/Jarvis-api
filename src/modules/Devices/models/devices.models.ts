import { Schema, model }  from 'mongoose'


const DevicesSchema = new Schema({
    Nombre: {type: String,  required: [true, "Se requiere un nombre"]},
    Ip: {type: String,  required: [true, "Se requiere una ip"]},
    Puerto: {type: Number,  required: [true, "Se requiere un puerto"]},
    Tipo: {type: String,  required: [true, "Se requiere un tipo"]},
    Categoria: {type: String,  required: [true, "Se requiere una categoria"]},
    Activo: {type: Boolean,  required: [true, "Se requiere un estado"]}
},{
    timestamps: true
})


export default model('DevicesModel', DevicesSchema);