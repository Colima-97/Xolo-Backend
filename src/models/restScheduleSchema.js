const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const daysOfWeekSchema = new Schema({
    day : {
        name : String,
        lowercase: true,
        enum: ['lunes', 'martes', 'miércoles', 'miercoles','jueves', 'viernes','sábado','sabado','domingo']
    }
});

const daysAndHoursSchema = new Schema({
    days_of_the_week : [daysOfWeekSchema],
    opening_time : Date,
    closing_time : Date,
    starting_delivery_time : Date,
    ending_delivery_time : Date
});

const restScheduleSchema = new Schema({
    id_schedule : {
        type : Number,
        required : true
    },
    id_restaurant : {
        type : Number,
        required : true
    },
    days : [daysAndHoursSchema],

});

const Schedule = mongoose.model('rest_schedule', restScheduleSchema);

module.exports = Schedule;