'use strict'

const Ctp = require('../models/company_third_party')
const Counters = require('../models/counters')

function signUpCompanyThirdParty(req, res){
    let company_third_party = new Ctp()

    Counters.findOneAndUpdate({id_tpuser: 'idTpUser'}, {$inc: {seq: 1}}, (err, counter) => {
        company_third_party.id_tpuser = counter.seq
        company_third_party.name = req.body.name
        company_third_party.description = req.body.description
        company_third_party.admin = req.body.admin
        company_third_party.phone_number = req.body.phone_number,
        company_third_party.username = req.body.username,
        company_third_party.password = req.body.password
        company_third_party.code = req.body.code
        if(err) return res.status(500).send({ message: `No se pudo actualizar el id`})
        company_third_party.save((err, ctpSalved) => {
            if(err){
                Counters.findOneAndUpdate({id_deliveryman: 'deliverymanId'}, {$inc: {seq: -1}}, (err, counter) => {
                    if(err) return res.status(500).send({ message: `Error al decrementar el id`})
                })
                return res.status(500).send({ message: `Error al crear el usuario: ${err}` })
            }
            res.send(200, {company_third_party: ctpSalved})
        })
    })
}

module.exports = {
    signUpCompanyThirdParty,
}