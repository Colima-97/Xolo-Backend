const Orders = require('../models/orders')
const Counters = require('../models/counters')
const Enum = require('enum')
const Deliveryman = require('../models/deliveryman')
//const Restaurant = require('../models/restaurant')
//const Client = require('../models/client')
const Ctp = require('../models/company_third_party')

function getOrdersRestaurant(req, res){
    var type = new Enum({1: 'Preparación', 2: 'En camino', 3: 'Pendiente', 4: 'Cancelada', 5: 'Entregada'})

    if(!type.getValue(req.body.status)){
        return res.status(500).send({ message: "Error al actualizar el estado de la orden, el dato enviado es invalido"})
    }

    Orders.find({status: type.getValue(req.body.status), id_restaurant: req.body.id_restaurant}, (err, orders) => {
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(!orders) return res.status(404).send({message: 'No existen ordenes'})
        res.send(200, {orders})
    })
}

function getOrdersCompanyThirdParty(req, res){
    Orders.find({id_company_third_party: req.body.id_company_third_party}, (err, content) => {
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(!content) return res.status(404).send({message: 'No existen ordenes'})
        res.status(200).send({content: content})
    })
}

function getOrdersRestaurantId(req, res){
    let idResturant = req.params.id_restaurant
    let idDeliveryman = req.params.id_deliveryman
    Orders.find({id_restaurant: idResturant, id_deliveryman: idDeliveryman}, (err, content) => {
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(!content) return res.status(404).send({ message: 'No existen ordenes asignadas a ese repartidor'})
        res.status(200).send({content: content})
    })
}

function getOrdersCompanyThirdPartyId(req, res){
    let idCtp = req.params.id_company_third_party
    let idDeliveryman = req.params.id_deliveryman
    Orders.find({id_company_third_party: idCtp, id_deliveryman: idDeliveryman}, (err, content) => {
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(!content) return res.status(404).send({ message: 'No existen ordenes asignadas a ese repartidor'})
        res.status(200).send({content: content})
    })
}

function getOrdersId(req, res){
    let ordersId = req.params.id_order

    Orders.findOne({id_order: ordersId}, (err, orders) => {
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(!orders) return res.status(404).send({message: 'No la orden'})
        res.status(200).send({orders: orders})
    })
}

// Revisar
/*async function getDataRestaurant(req, res){
    var name_restaurant = ''
    var rest_phone_number = 0
    await Restaurant.findOne({id_restaurant: req.body.id_restaurant}, (err, content) => {
        if(err) return res.status(500).send({message: `Error al realizar la petición ${err}`})
        if(!content) return res.status(404).send({ message: 'No existe el restaurante'})
        name_restaurant = content.restaurant_name
        rest_phone_number = content.rest_phone_number
    })
    return {
        name_restaurant, 
        rest_phone_number
    }
}*/

async function getDataDeliveryman(req, res){
    var name_deliveryman = ''
    var deliveryman_phone_number = 0
    var deliveryman_type = ''
    var code = ''
    await Deliveryman.findOne({id_deliveryman: req.body.id_deliveryman}, (err, content) => {
        if(err) return res.status(500).send({message: `Error al realizar la petición ${err}`})
        if(!content) return res.status(404).send({message: 'El repartidor no existe'})
        name_deliveryman = content.name + " " + content.last_name
        deliveryman_phone_number = content.phone_number
        deliveryman_type = content.deliveryman_type
        code = content.code
    })
    return {
        name_deliveryman,
        deliveryman_phone_number,
        deliveryman_type,
        code
    }
}

// Revisar
/*async function getDataClient(req,res){
    var name_client = ''
    var client_phone_number = 0
    var client_address = ''
    await Client.findOne({id_client: req.body.id_client}, (err, content) => {
        if(err) return res.status(500).send({ message: `Error al realizar la petición ${err}`})
        if(!content) return res.status(404).send({ message: 'El cliente no existe'})
        name_client = content.name + " " + content.last_name
        client_phone_number = content.username
        client_address = content.address + " #" + content.number_address
    })
    return {
        name_client, 
        client_phone_number
    }
}*/

async function getDataCompanyThirdParty(req, res, codeDeliveryman){
    var id_company_third_party = 0
    await Ctp.findOne({ctp_code: codeDeliveryman}, (err, content) => {
        if(err) return res.status(500).send({ message: `Error al realizar la petición ${err}`})
        if(!content) return res.status(404).send({message: 'La compañia no existe'})
        id_company_third_party = content.id_tpuser
    })
    return id_company_third_party
}

function saveOrders(req, res){
    let orders = new Orders()

    Counters.findOneAndUpdate({id_order: 'orderId'}, {$inc: {seq: 1}}, async (err, counter) => {
        if(err) return res.status(500).send({ message: `No se pudo actualizar el id`})
        orders.id_order = counter.seq
        orders.id_restaurant = req.body.id_restaurant
        //Revisar
        /*var dataRestaurant = await getDataRestaurant(req,res)
        orders.name_restaurant = dataRestaurant.name_restaurant
        orders.rest_phone_number = dataRestaurant.rest_phone_number*/
        orders.id_deliveryman = req.body.id_deliveryman
        var dataDeliveryman = await getDataDeliveryman(req,res)
        orders.name_deliveryman = dataDeliveryman.name_deliveryman
        orders.deliveryman_phone_number = dataDeliveryman.deliveryman_phone_number
        orders.deliveryman_type = dataDeliveryman.deliveryman_type
        if(dataDeliveryman.deliveryman_type == 'no-fixed'){
            var dataCtp = await getDataCompanyThirdParty(req, res, dataDeliveryman.code)
            orders.id_company_third_party = dataCtp.id_company_third_party
        }
        orders.id_client = req.body.id_client
        // Revisar
        /*var dataClient = await getDataClient(req,res)
        orders.name_client = dataClient.name_client
        orders.client_phone_number = dataClient.client_phone_number*/
        orders.id_food = req.body.id_food
        orders.food_price = req.body.food_price
        orders.subtotal = req.body.subtotal
        orders.commission = req.body.commission
        orders.total_price = req.body.total_price
        orders.client_address = req.body.client_address
        
        orders.save((err, ordersSaved) => {
            if(err){
                Counters.findOneAndUpdate({id_order: 'orderId'}, {$inc: {seq: -1}}, (err, counter) => {
                    if(err) return res.status(500).send({ message: `Error al decrementar el id`})
                })
                return res.status(500).send({message: `Error al guardar en la base de datos: ${err}`})
            }
            res.send(201, {orders: ordersSaved})
        })
    })
}

function updateStatusOrder(req, res){
    var type = new Enum({1: 'Preparación', 2: 'En camino', 3: 'Pendiente', 4: 'Cancelada', 5: 'Entregada'})
    let ordersId = req.params.id_order

    if(!type.getValue(req.body.status)){
        return res.status(500).send({ message: "Error al actualizar el estado de la orden, el dato enviado es invalido"})
    }

    Orders.findOneAndUpdate({id_order: ordersId}, { status: type.get(req.body.status) }, (err, ordersUpdated) => {
        if(err) return res.status(500).send({message: `Error al actualizar el estado de la orden: ${err}`})
        if(!ordersUpdated) return res.status(404).send({ message: 'La orden no existe' })
        res.status(200).send({ message: "Actualizado correctamente"})
    })
}

module.exports = {
    getOrdersRestaurant,
    getOrdersCompanyThirdParty,
    getOrdersRestaurantId,
    getOrdersCompanyThirdPartyId,
    getOrdersId,
    saveOrders,
    updateStatusOrder
}