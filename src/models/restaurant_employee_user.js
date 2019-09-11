const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const Enum = require('enum')

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
    //tokens: required - array(String)
    Latitude: {
        type: Number
    },
    Longitude: {
        type: Number
    }
    /*
    Days:
        daysOfTheWeek [ 'lunes' 'martes' ... 'domingo'  ],
        StartTime
        EndTime
        DayOff - array
    */
})
module.exports = mongoose.model('deliveryman', DeliverymanSchema)