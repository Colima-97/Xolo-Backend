const newClient = require('../models/clientSchema')

function getClient(req, res){
    newClient.find({}, (err, client) => {
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(!client) return res.status(404).send({message: 'No existen clientes aún'})
        res.send(200, {client})
    })
}

function getClientId(req, res){
    let clientId = req.params.id_client

    newClient.findOne({Id_client: clientId}, (err, client) => {
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(!client) return res.status(404).send({message: 'No existen clientes aún'})
        res.status(200).send({client:client})
    })
}

function saveClient(req, res){
    let client = new newClient()

    client.Id_client = req.body.Id_client
    client.Username = req.body.Username
    client.Name = req.body.Name
    client.Last_name = req.body.Last_name
    client.User_type = req.body.User_type
    client.Email = req.body.Email
    client.Address = req.body.Address

    client.save((err,clientSaved) => {
        if(err) return res.status(500).send({message: `Error al guardar en la base de datos ${err}`})
        res.send(200, {client: clientSaved})
    })
}

function updateClient(req, res){
    let clientId = req.params.Id_client
    let update = req.body

    newClient.findOneAndUpdate({Id_client: clientId}, update, (err, clientUpdated) =>{
        if(err) return res.status(500).send({message: `Error al actualizar el cliente: ${err}`})
        res.status(200).send({client: clientUpdated})
    })
}

function deleteClient(req, res){
    let clientId = req.params.Id_client

    newClient.remove({Id_client: clientId}, (err, clientDelete) =>{
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