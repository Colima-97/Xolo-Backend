const Nfdo = require('../models/no_fixed_deliveryman_orders')
const Counters = require('../models/counters')
const Enum = require('enum')

function getNfdo(req, res){
    Nfdo.find({}, (err, no_fixed_deliveryman_orders) => {
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(!no_fixed_deliveryman_orders) return res.status(404).send({message: 'No existen ordenes para los repartidores'})
        res.send(200, {no_fixed_deliveryman_orders})
    })
}

function getNfdoId(req, res){
    let nfdoId = req.params.idOrder

    Nfdo.findOne({idOrder: nfdoId}, (err, no_fixed_deliveryman_orders) => {
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(!no_fixed_deliveryman_orders) return res.status(404).send({message: 'No existen ordenes para los repartidores'})
        res.status(200).send({no_fixed_deliveryman_orders: no_fixed_deliveryman_orders})
    })
}

function getOrdersIdRestaurantNfdo(req, res){
    let nfdoIdRestaurant = req.params.id_restaurant

    Nfdo.findOne({id_restaurant: nfdoIdRestaurant}, (err, no_fixed_deliveryman_orders) => {
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(!no_fixed_deliveryman_orders) return res.status(404).send({message: 'No existen ordenes para los repartidores con ese id'})
        res.status(200).send({no_fixed_deliveryman_orders: no_fixed_deliveryman_orders})
    })
}

function saveNfdo(req, res){
    let no_fixed_deliveryman_orders = new Nfdo()

    var type = new Enum({1: 'Preparación', 2: 'En camino', 3: 'Pendiente', 4: 'Cancelada', 5: 'Entregada'})

    if(!type.getValue(req.body.status)){
        return res.status(500).send({ message: "Error al actualizar el estado de la orden, el dato enviado es invalido"})
    }

    Counters.findOneAndUpdate({idOrderNfdo: 'idOrder'}, {$inc: {seq: 1}}, (err, counter) => {
        if(err) return res.status(500).send({ message: `Error al procesar la solicitud: ${err}`})
        var statusNfdo = type.getValue(req.body.status)
        no_fixed_deliveryman_orders.idOrder = counter.seq
        no_fixed_deliveryman_orders.id_deliveryman = req.body.id_deliveryman
        no_fixed_deliveryman_orders.id_restaurant = req.body.id_restaurant
        no_fixed_deliveryman_orders.id_tpuser = req.body.id_tpuser
        no_fixed_deliveryman_orders.status = statusNfdo

        no_fixed_deliveryman_orders.save((err, nfdoSaved) => {
            if(err){
                Counters.findOneAndUpdate({idOrderNfdo: 'idOrder'}, {$inc: {seq: -1}}, (err, counter) => {
                    if(err) return res.status(500).send({ message: `Error al decrementar el id`})
                })
                return res.status(500).send({message: `Error al guardar en la base de datos: ${err}`})
            }
            res.send(200, {no_fixed_deliveryman_orders: nfdoSaved})
        })
    })
}

function updateStatusNfdo(req, res){
    let nfdoId = req.params.idOrder
    var type = new Enum({1: 'Preparación', 2: 'En camino', 3: 'Pendiente', 4: 'Cancelada', 5: 'Entregada'})
    
    if(!type.getValue(req.body.status)){
        return res.status(500).send({ message: "Error al actualizar el estado de la orden, el dato enviado es invalido"})
    }

    Nfdo.findOneAndUpdate({idOrder: nfdoId}, {status: type.get(req.body.status)}, (err, nfdoUpdated) => {
        if(err) return res.status(500).send({message: `Error al actualizar el repartidor: ${err}`})
        if(!nfdoUpdated) return res.status(404).send({ message: 'La orden no existe' })
        res.status(200).send({no_fixed_deliveryman_orders: nfdoUpdated})
    })
}

module.exports = {
    getNfdo,
    getNfdoId,
    getOrdersIdRestaurantNfdo,
    saveNfdo,
    updateStatusNfdo
}