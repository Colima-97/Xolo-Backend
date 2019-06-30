const Nfdo = require('../models/no_fixed_deliveryman_orders')

function getNfdo(req, res){
    Nfdo.find({}, (err, no_fixed_deliveryman_orders) => {
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(!no_fixed_deliveryman_orders) return res.status(404).send({message: 'No existen ordenes para los repartidores'})
        res.send(200, {no_fixed_deliveryman_orders})
    })
}

function getNfdoId(req, res){
    let nfdoId = req.params.id_deliveryman

    Nfdo.findOne({id_deliveryman: nfdoId}, (err, no_fixed_deliveryman_orders) => {
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(!no_fixed_deliveryman_orders) return res.status(404).send({message: 'No existen ordenes para los repartidores'})
        res.status(200).send({no_fixed_deliveryman_orders: no_fixed_deliveryman_orders})
    })
}

function saveNfdo(req, res){
    let no_fixed_deliveryman_orders = new Nfdo()
    no_fixed_deliveryman_orders.id_deliveryman = req.body.id_deliveryman
    no_fixed_deliveryman_orders.id_restaurant = req.body.id_restaurant
    no_fixed_deliveryman_orders.id_tpuser = req.body.id_tpuser
    no_fixed_deliveryman_orders.order_date = req.body.order_date

    no_fixed_deliveryman_orders.save((err, nfdoSaved) => {
        if(err) return res.status(500).send({message: `Error al guardar en la base de datos: ${err}`})
        res.send(200, {no_fixed_deliveryman_orders: nfdoSaved})
    })
}

function updateNfdo(req, res){
    let nfdoId = req.params.id_deliveryman
    let update = req.body

    Nfdo.findOneAndUpdate({id_deliveryman: nfdoId}, update, (err, nfdoUpdated) => {
        if(err) return res.status(500).send({message: `Error al actualizar el repartidor: ${err}`})
        res.status(200).send({no_fixed_deliveryman_orders: nfdoUpdated})
    })
}

function deleteNfdo(req, res){
    let nfdoId = req.params.id_deliveryman

    Nfdo.remove({id_deliveryman: nfdoId}, (err, nfdoDeleted) => {
        if(err) return res.status(500).send({message: `Error al borrar el repartidor: ${err}`})
        res.status(200).send({message: `El repartidor: ${nfdoId} ha sido borrado`})
    })
}

module.exports = {
    getNfdo,
    getNfdoId,
    saveNfdo,
    updateNfdo,
    deleteNfdo
}