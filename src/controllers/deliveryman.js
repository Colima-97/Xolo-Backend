'use strict'

const Deliveryman = require('../models/deliveryman')
const Counters = require('../models/counters')
const service = require('../services')
//const Restaurant = require('../models/restaurant')
const Ctp = require('../models/company_third_party')
const Enum = require('enum')

async function getDeliverymans(req, res){
    await Deliveryman.find({code: req.body.code}, (err, deliveryman) => {
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(!deliveryman) return res.status(404).send({message: 'No existen repartidores'})
        res.send(200, {deliveryman})
    })
}

async function updateStatusDeliveryman(req, res){
    let deliverymanId = req.params.id_deliveryman
    var type = new Enum({1: 'pendiente', 2: 'activo', 3: 'inactivo'})
    if(!type.getValue(req.body.status)){
        return res.status(500).send({ message: "Error al actualizar el estado del repartidor, el dato enviado es invalido"})
    }

    await Deliveryman.findOneAndUpdate({id_deliveryman: deliverymanId}, {status: type.getValue(req.body.status)},(err, content) => {
        if(err) return res.status(500).send({message: `Ha ocurrido un error, ${err}`})
        if(!content) return res.status(404).send({message: 'El repartidor no existe'})
        res.status(200).send({message: 'Actualizado correctamente'})
    })
}

async function verifyPhoneNumber(req, res){
    await Deliveryman.findOne({phone_number: req.body.phone_number}, (err, content) => {
        if(err) return res.status(500).send({ message: `Ah ocurrido un error ${err}`})
        if(content) return res.status(200).send({ message: 'El telefono ya existe'})
        res.status(200).send({ message: 'Telefono correcto'})
    })
}

// Revisar
async function verifyCode(req, res){
    if(req.body.deliveryman_type == 1){
        /*await Restaurant.findOne({rest_code: req.body.code},(err, content) => {
            if(err) return res.status(500).send({ message: `Ah ocurrido un error ${err}`})
            if(!content) return res.status(404).send({message: 'Codigo invalido'})
            res.status(200).send({ message: 'Codigo aceptado'}) 
        })*/
    }else{
        await Ctp.findOne({ctp_code: req.body.code}, (err, content) => {
            if(err) return res.status(500).send({ message: `Ah ocurrido un error ${err}`})
            if(!content) return res.status(404).send({message: 'Codigo invalido'})
            res.status(200).send({ message: 'Codigo aceptado'})
        })
    }
}

function signUpDeliveryman(req, res){
    let user = new Deliveryman()
    var type = new Enum({1: 'fixed', 2: 'no-fixed'})
    if(!type.getValue(req.body.deliveryman_type)){
        return res.status(500).send({ message: "Error al actualizar el estado del repartidor, el dato enviado es inválido"})
    }
    Deliveryman.findOne({phone_number: req.body.phone_number}, (err, phonenumber) => {
        if(err) return res.status(500).send({ message: `Ah ocurrido un error ${err}`})
        if(phonenumber) return res.status(200).send({ message: 'El telefono ya está asociado a una cuenta'})
        Counters.findOneAndUpdate({id_deliveryman: 'deliverymanId'}, {$inc: {seq: 1}}, (err, counter) => {
            user.id_deliveryman = counter.seq
            user.name = req.body.name,
            user.last_name = req.body.last_name,
            user.deliveryman_type = type.getValue(req.body.deliveryman_type),
            user.address = req.body.address,
            user.phone_number = req.body.phone_number,
            user.password = req.body.password 
            user.code = req.body.code  
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
    getDeliverymans,
    updateStatusDeliveryman,
    verifyPhoneNumber,
    verifyCode,
    signUpDeliveryman
}
