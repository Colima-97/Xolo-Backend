const Orders = require('../models/orders')
const Counters = require('../models/counters')
const Enum = require('enum')

function getOrders(req, res){
    Orders.find({}, (err, orders) => {
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(!orders) return res.status(404).send({message: 'No existen ordenes'})
        res.send(200, {orders})
    })
}

function getOrdersId(req, res){
    let ordersId = req.params.id_order

    Orders.findOne({id_order: ordersId}, (err, orders) => {
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(!orders) return res.status(404).send({message: 'No existen ordenes'})
        res.status(200).send({orders: orders})
    })
}

function saveOrders(req, res){
    let orders = new Orders()

    Counters.findOneAndUpdate({id_order: 'orderId'}, {$inc: {seq: 1}}, (err, counter) => {
        if(err) return res.status(500).send({ message: `No se pudo actualizar el id`})
        orders.id_order = counter.seq
        orders.id_restaurant = req.body.id_restaurant
        orders.id_deliveryman = req.body.id_deliveryman
        orders.id_client = req.body.id_client
        orders.status = req.body.status
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
        res.status(200).send({ message: "Actualizado correctamente"})
    })
}

module.exports = {
    getOrders,
    getOrdersId,
    saveOrders,
    updateStatusOrder
}