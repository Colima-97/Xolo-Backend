const newClient = require('../models/clientSchema')

function getClient(req, res){
    newClient.find({}, (err, client) => {
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(!client) return res.status(404).send({message: 'No existen clientes aún'})
        res.status(200).send({client})
    })
}

function getClientId(req, res){
    let clientId = req.params.id_client

    newClient.findOne({id_client: clientId}, (err, client) => {
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(!client) return res.status(404).send({message: 'No existen clientes aún'})
        res.status(200).send({client:client})
    })
}

function saveClient(req, res){
    let client = new newClient()

    client.id_client = req.body.id_client
    client.username = req.body.username
    client.name = req.body.name
    client.last_name = req.body.last_name
    client.user_type = req.body.user_type
    client.email = req.body.email
    client.address = req.body.address

    client.save((err,clientSaved) => {
        if(err) return res.status(500).send({message: `Error al guardar en la base de datos ${err}`})
        res.send(200, {client: clientSaved})
        res.status(200).send({client: clientSaved})
    })
}

function updateClient(req, res){
    let clientId = req.params.id_client
    let update = req.body

    newClient.findOneAndUpdate({id_client: clientId}, update, (err, clientUpdated) =>{
        if(err) return res.status(500).send({message: `Error al actualizar el cliente: ${err}`})
        res.status(200).send({client: clientUpdated})
    })
}

function deleteClient(req, res){
    let clientId = req.params.id_client

    newClient.remove({id_client: clientId}, (err, clientDelete) =>{
        if(err) return res.status(500).send({message: `Error al borrar cliente: ${err}`})
        res.status(200).send({message: `El cliente: ${clientId} ha sido borrado`})
    })
}

module.exports = {
    getClient,
    getClientId,
    saveClient,
    updateClient,
    deleteClient
}