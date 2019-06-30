const Deliveryman = require('../models/deliveryman')

function getDeliveryman(req, res){
    Deliveryman.find({}, (err, deliveryman) => {
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(!deliveryman) return res.status(404).send({message: 'No existen repartidores'})
        res.send(200, {deliveryman})
    })
}

function getDeliverymanId(req, res){
    let deliverymanId = req.params.id_deliveryman

    Deliveryman.findOne({id_deliveryman: deliverymanId}, (err, deliveryman) => {
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(!deliveryman) return res.status(404).send({message: 'No existen repartidores'})
        res.status(200).send({deliveryman: deliveryman})
    })
}

function saveDeliveryman(req, res){
    let deliveryman = new Deliveryman()
    deliveryman.id_deliveryman = req.body.id_deliveryman
    deliveryman.name = req.body.name
    deliveryman.last_name = req.body.last_name
    deliveryman.user_type = req.body.user_type
    deliveryman.deliveryman_type = req.body.deliveryman_type
    deliveryman.address = req.body.address
    deliveryman.phone_number = req.body.phone_number

    deliveryman.save((err, deliverymanSaved) => {
        if(err) return res.status(500).send({message: `Error al guardar en la base de datos: ${err}`})
        res.send(200, {deliveryman: deliverymanSaved})
    })
}

function updateDeliveryman(req, res){
    let deliverymanId = req.params.id_deliveryman
    let update = req.body

    Deliveryman.findOneAndUpdate({id_deliveryman: deliverymanId}, update, (err, deliverymanUpdated) => {
        if(err) return res.status(500).send({message: `Error al actualizar el repartidor: ${err}`})
        res.status(200).send({deliveryman: deliverymanUpdated})
    })
}

function deleteDeliveryman(req, res){
    let deliverymanId = req.params.id_deliveryman

    Deliveryman.remove({id_deliveryman: deliverymanId}, (err, deliveryman) => {
        if(err) return res.status(500).send({message: `Error al borrar el repartidor: ${err}`})
        res.status(200).send({message: `El repartidor: ${deliverymanId} ha sido borrado`})
    })
}

module.exports = {
    getDeliveryman,
    getDeliverymanId,
    saveDeliveryman,
    updateDeliveryman,
    deleteDeliveryman
}