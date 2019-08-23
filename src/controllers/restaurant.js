const newRest = require('../models/restaurantSchema')
const newRestUser = require('../models/restUserSchema')
//const newRestFM = require('../models/restFoodMenuSchema')
//const newSchedule = require('../models/restScheduleSchema')

/*------------------------Getting methods------------------------*/
//Get everything from a restaurant
//You must introduce a restaurant name
//Only restaurantSchema
function getEFORest(req, res){
    let restName = req.params.restaurant_name

    newRest.findOne({restaurant_name: restName},
        (err, restaurant) =>{
            if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
            if(restaurant === null) return res.status(404).send({message: 'No existen registros aún'})
            if(!restaurant) return res.status(404).send({message: 'No se encontró la petición'})
            res.status(200).send({restaurant})
        })
}

//Client's main page
//Only restaurant_name, description, min_amount
function getAllRest(req, res){
    newRest.find({},
        'restaurant_name description min_amount', 
        (err, restaurant) =>{
            if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
            if(restaurant === null) return res.status(404).send({message: 'No existen registros aún'})
            if(!restaurant) return res.status(404).send({message: 'No se encontró la petición'})
            res.status(200).send({restaurant})            
    })
}

//Getting a restaurant
//Only restaurant_name, description, min_amount, rest_phone_number, email, address, number_address
function getRestInfo(req, res){
    let restId = req.params.id_restaurant

    newRest.findOne({id_restaurant: restId}, 
        'restaurant_name description min_amount rest_phone_number email address number_address',
        (err, restaurant) =>{
            if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
            if(restaurant === null) return res.status(404).send({message: 'No existen registros aún'})
            if(!restaurant) return res.status(404).send({message: 'No se encontró la petición'})
            res.status(200).send({restaurant})    
    })
}

//Getting a restaurant User information
//Only name, last_name, username, admin, and rest_name_working properties
//This view can be useful for both RestUser Admin or normals one
//Needs a id_username
function getRestUser(req, res){
    let restUserId = req.params.id_username

    newRestUser.findOne({id_username: restUserId},
        'name last_name username admin rest_name_working',
        (err, restUser) =>{
            if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
            if(restUser === null) return res.status(404).send({message: 'No existen registros aún'})
            if(!restUsers) return res.status(404).send({message: 'No se encontró la petición'})
            res.status(200).send({restUser}) 
    })
}

//Getting users from certain restaurant
//You need to use the restaurant name
function getRestUserByRest(req, res){
    let restName = req.params.rest_name_working

    newRestUser.find({rest_name_working: restName},
        'name last_name username admin rest_name_working',
        (err, restUsers) =>{
            if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})            
            if(!restUsers) return res.status(404).send({message: 'No se encontró la petición'})
            res.status(200).send({restUsers}) 
        })
}

/*------------------------Posting methods------------------------*/
//Post a new Restaurant
function saveNewRest(req, res){
    let rest = new newRest()

    rest.id_restaurant = req.body.id_restaurant
    rest.restaurant_name = req.body.restaurant_name
    rest.rest_code = req.body.rest_code
    rest.description = req.body.description
    rest.min_amount = req.body.min_amount
    rest.rest_phone_number = req.body.rest_phone_number
    rest.email = req.body.email
    rest.address = req.body.address
    rest.number_address = req.body.number_address
    rest.latitude = req.body.latitude
    rest.longitude = req.body.longitude

    rest.save((err,restSaved) => {
        if(err) return res.status(500).send({message: `Error al guardar en la base de datos ${err}`})
        res.status(200).send({rest: restSaved})
    })
}

//Post a new Restaurant User
//It requires id_username, id_rest_working, rest_name_working,
//code, username, password, name and last_name
async function saveNewRestUser(req, res){
    let restUser = new newRestUser()

    restUser.id_username = req.body.id_username
    restUser.id_rest_working = req.body.id_rest_working
    restUser.rest_name_working = req.body.rest_name_working
    restUser.code = req.body.code
    restUser.username = req.body.username
    restUser.password = req.body.password
    restUser.user_type = 'restaurant'
    restUser.admin = false
    restUser.name = req.body.name
    restUser.last_name = req.body.last_name
    
    var response = await verifySaveNewRestUserData(req.body.id_rest_working, req.body.rest_name_working, req.body.code)

    if(response){
        restUser.save((err, restUserSaved) => {
            if(err) return res.status(500).send({message: `Error al guardar en la base de datos ${err}`})
            res.status(200).send({message: 'Usuario guardado'})
        })
    }else{
        res.status(400).send({message: 'Verifique que el id del restaurante, el nombre y el código coincidan'})
    }    
}

function verifySaveNewRestUserData(id_rest_working, rest_name_working, code){
    let restId = id_rest_working
    let restName = rest_name_working
    let restCode = code

    var response = newRest.exists({id_restaurant: restId, restaurant_name: restName, rest_code: restCode})
    return response

}

/*------------------------Updating methods------------------------*/
//Updates anything within Restaurant Schema
//Only RestaurantSchema
function upRest(req,res){
    let restId = req.params.id_restaurant
    let update = req.body

    newRest.findOneAndUpdate({id_restaurant: restId}, update, (err, restUpdated) => {
        if(err) return res.status(500).send({message: `Error al actualizar el restaurante: ${err}`})
        res.status(200).send({restaurant: restUpdated})
    })
}

//Updating anything within Restaurant User
//You must introduce your username and password into body, no url
//This method is neither password nor username update 
async function upRestUser(req, res){
    let restUser = req.body.username
    let restUserPass = req.body.password
    let update = req.body

    var response = await verifyUpRestUserData(restUser, restUserPass)

    if(response){
        newRestUser.findOneAndUpdate({username: restUser}, update, (err, restUserUp) => {
            if(err) return res.status(500).send({message: `Error al actualizar el usuario: ${err}`})
            res.status(200).send({message: 'Usuario actualizado'})
        })
    }else{
        res.status(400).send({message: 'Verifique los datos de usuario y contraseña'})
    }
}

function verifyUpRestUserData(username, password){
    let restUser = username
    let restUserPass = password

    var response = newRestUser.exists({username: restUser, password: restUserPass})
    return response
}

/*------------------------Deleting methods------------------------*/
//Delete a restaurant 
function delRest(req, res){
    let restId = req.params.id_restaurant

    newRest.remove({id_restaurant: restId}, (err, restDeleted) => {
        if(err) return res.status(500).send({message: `Error al borrar cliente: ${err}`})
        res.status(200).send({message: `El restaurante ${restId} ha sido borrado`})
    })
}

module.exports = {
    //Restaurant
    getEFORest,
    getAllRest,
    getRestInfo,
    saveNewRest,
    upRest,
    delRest,
    
    //Restaurant users
    saveNewRestUser,
    getRestUser,
    getRestUserByRest,
    upRestUser
}