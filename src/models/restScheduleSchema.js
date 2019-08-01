const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restScheduleSchema = new Schema({
    Id_schedule : {
        type : Number,
        required : true
    },
    Id_restaurant : {
        type : Number,
        required : true
    },
    Days : [daysAndHoursSchema],

});

const daysAndHoursSchema = new Schema({
    Days_of_the_week : [daysOfWeekSchema],
    Opening_time : Date,
    Closing_time : Date,
    Starting_delivery_time : Date,
    Ending_delivery_time : Date
});

const daysOfWeekSchema = new Schema({
    day : {
        name : String,
        lowercase: true,
        enum: ['lunes', 'martes', 'miércoles', 'miercoles','jueves', 'viernes','sábado','sabado','domingo']
    }
});

const Schedule = mongoose.model('schedule', restScheduleSchema);

module.exports = Schedule;