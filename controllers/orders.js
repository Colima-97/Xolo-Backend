const Orders = require('../models/orders')

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
    orders.id_order = req.body.id_order
    orders.id_restaurant = req.body.id_restaurant
    orders.id_deliveryman = req.body.id_deliveryman
    orders.id_client = req.body.id_client
    orders.status = req.body.status
    orders.order_date = req.body.order_date
    orders.id_food = req.body.id_food
    orders.food_price = req.body.food_price
    orders.subtotal = req.body.subtotal
    orders.commission = req.body.commission
    orders.total_price = req.body.total_price
    orders.client_address = req.body.client_address

    orders.save((err, ordersSaved) => {
        if(err) return res.status(500).send({message: `Error al guardar en la base de datos: ${err}`})
        res.send(200, {orders: ordersSaved})
    })
}

function updateOrders(req, res){
    let ordersId = req.params.id_order
    let update = req.body

    Orders.findOneAndUpdate({id_order: ordersId}, update, (err, ordersUpdated) => {
        if(err) return res.status(500).send({message: `Error al actualizar la orden: ${err}`})
        res.status(200).send({orders: ordersUpdated})
    })
}

function deleteOrders(req, res){
    let ordersId = req.params.id_order

    Orders.remove({id_order: ordersId}, (err, orders) => {
        if(err) return res.status(500).send({message: `Error al borrar la orden: ${err}`})
        res.status(200).send({message: `La orden: ${ordersId} ha sido borrado`})
    })
}

module.exports = {
    getOrders,
    getOrdersId,
    saveOrders,
    updateOrders,
    deleteOrders
}