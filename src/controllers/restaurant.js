const newRest = require('../models/restaurantSchema')
//const newRestUser = require('../models/restUserSchema')
//const newRestFM = require('../models/restFoodMenuSchema')
//const newSchedule = require('../models/restScheduleSchema')

/*------------------------Getting methods------------------------*/
/*function getEFORest(req, res){
    let restId = req.params.id_restaurant

    newRest.findOne({Id_restaurant: restId})
}*/

function getAllRest(req, res){
    newRest.find({}, (err, restaurant) =>{
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(!client) return res.status(404).send({message: 'No existen restaurantes aún'})
        res.send(200, {restaurant})
    })
}


/*------------------------Posting methods------------------------*/

/*------------------------Updating methods------------------------*/

/*------------------------Deleting methods------------------------*/


module.exports = {
    getAllRest
}