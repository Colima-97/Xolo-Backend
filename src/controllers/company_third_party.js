const ctp = require('../models/company_third_party')

function getCompanyThirdParty(req, res){
    ctp.find({}, (err, company_third_party) => {
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(!company_third_party) return res.status(404).send({message: 'No existen compañias'})
        res.send(200, {company_third_party})
    })
}

function getCompanyThirdPartyId(req, res){
    let ctpId = req.params.id_tpuser

    ctp.findOne({id_tpuser: ctpId}, (err, company_third_party) => {
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(!company_third_party) return res.status(404).send({message: 'No existen compañias'})
        res.status(200).send({company_third_party: company_third_party})
    })
}

function saveCompanyThirdParty(req, res){
    let company_third_party = new ctp()
    company_third_party.id_tpuser = req.body.id_tpuser
    company_third_party.name = req.body.name
    company_third_party.description = req.body.description
    company_third_party.user_type = req.body.user_type
    company_third_party.admin = req.body.admin
    company_third_party.phone_number = req.body.phone_number

    company_third_party.save((err, ctpSalved) => {
        if(err) return res.status(500).send({message: `Error al guardar en la base de datos: ${err}`})
        res.send(200, {company_third_party: ctpSalved})
    })
}

function updateCompanyThirdParty(req, res){
    let ctpId = req.params.id_tpuser
    let update = req.body

    ctp.findOneAndUpdate({id_tpuser: ctpId}, update, (err, ctpUpdated) => {
        if(err) return res.status(500).send({message: `Error al actualizar la compañia: ${err}`})
        res.status(200).send({company_third_party: ctpUpdated})
    })
}

function deleteCompanyThirdParty(req, res){
    let ctpId = req.params.id_tpuser

    ctp.remove({id_tpuser: ctpId}, (err, company_third_party) => {
        if(err) return res.status(500).send({message: `Error al borrar la compañia: ${err}`})
        res.status(200).send({message: `La compañia: ${ctpId} ha sido borrado`})
    })
}

module.exports = {
    getCompanyThirdParty,
    getCompanyThirdPartyId,
    saveCompanyThirdParty,
    updateCompanyThirdParty,
    deleteCompanyThirdParty
}