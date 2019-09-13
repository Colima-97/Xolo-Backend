const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const Enum = require('enum')

const Token = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    }
})

const Day = new Schema({
    dayOfTheWeek: {
        type: String,
        required: true,
        validate(value){
            var type = new Enum({1: 'Lunes', 2: 'Martes', 3: 'Miercoles', 4: 'Jueves', 5: 'Viernes', 6: 'Sabado', 7: 'Domingo'})
            if(!type.getValue(value)){
                throw new Error('Día inválido')
            }else{
                this.dayOfTheWeek = type.getValue(value)
            }
        }
    },
    DayOff: {
        type: Boolean,
        required: true
    },
    StartTime: {
        type: String
    },
    EndTime: {
        type: String
    }
})

const DeliverymanSchema = new Schema({
    Id: { 
        type: Number,
        required: true, 
        unique: true 
    },
    Code: {
        type: String, 
        required: true,
        uppercase: true
    },
    Username: {
        type: String,
        unique: true,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    UserType: {
        type: String,
        default: 4,
        validate(value){
            var type = new Enum({1: 'client', 2: 'deliveryman', 3: 'restaurantadmin', 4: 'restaurantemployee', 5: 'thirdparty'})
            if(!type.getValue(value)){
                throw new Error('Tipo de usuario inválido')
            }else{
                this.UserType = type.getValue(value)
            }
        }
    },
    StatusType: {
        type: String,
        default: 1,
        validate(value){
            var type = new Enum({1: 'Pending', 2: 'Active', 3: 'Inactive', 4: 'Banned'})
            if(!type.getValue(value)){
                throw new Error('Estado de usuario inválido')
            }else{
                this.StatusType = type.getValue(value)
            }
        }
    },
    LastLogin: {
        type: Date
    },
    CreatedAt: {
        type: Date, 
        default: Date.now
    },
    Tokens: [Token],
    Latitude: {
        type: Number
    },
    Longitude: {
        type: Number
    },
    Days: [Day]
})
module.exports = mongoose.model('deliveryman', DeliverymanSchema)