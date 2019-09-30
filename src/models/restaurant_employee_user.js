const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Enum = require('enum')
const Property = require('../helpers/properties')
const UserType = Property.UserType
const StatusType = Property.StatusType

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
    UserType,
    StatusType,
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