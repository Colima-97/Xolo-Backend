'use strict'

const Deliveryman = require('../models/deliveryman')
const Counters = require('../models/counters')
const service = require('../services')

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

function signUpDeliveryman(req, res){
    let user = new Deliveryman()
    Deliveryman.findOne({phone_number: req.body.phone_number}, (err, phonenumber) => {
        if(err) return res.status(500).send({ message: `Ha ocurrido un error ${err}`})
        if(phonenumber) return res.status(200).send({ message: 'El telefono ya está asociado a una cuenta'})
        Counters.findOneAndUpdate({id_deliveryman: 'deliverymanId'}, {$inc: {seq: 1}}, (err, counter) => {
            user.id_deliveryman = counter.seq
            user.name = req.body.name,
            user.last_name = req.body.last_name,
            user.deliveryman_type = req.body.deliveryman_type,
            user.address = req.body.address,
            user.phone_number = req.body.phone_number,
            user.password = req.body.password
    
            if(err) return res.status(500).send({ message: `No se pudo actualizar el id`})
            user.save((err) => {
                if(err){
                    Counters.findOneAndUpdate({id_deliveryman: 'deliverymanId'}, {$inc: {seq: -1}}, (err, counter) => {
                        if(err) return res.status(500).send({ message: `Error al decrementar el id`})
                    })
                    return res.status(500).send({ message: `Error al crear el usuario: ${err}` })
                }
                res.status(201).send({ token: service.createToken() })
            })
        })
    })
}

module.exports = {
    getDeliveryman,
    getDeliverymanId,
    saveDeliveryman,
    updateDeliveryman,
    deleteDeliveryman,
    signUpDeliveryman
}