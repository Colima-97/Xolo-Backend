'use strict'

var twilio = require('twilio')
var config = require('../../config')
var CodeSMS = require('../models/codeSMS')
var client = new twilio(config.accountSid, config.authToken)

function getCodeSMS(){
    return "000000".replace(/0/g,function(){
            return (0 | Math.random()*10)
        })
}

function saveCodeSMS(codeMessage){
    let code = new codeSMS()
    code.codeSMS = codeMessage
    code.save()
}

function sendSMS(req, res){
    var code = getCodeSMS()
    client.messages.create({
        body: code + ' es tu codigo de verificación de Xolo.',
        to: req.body.phone_number,
        from: '+18508058742'
    }).then(saveCodeSMS(code)).then(res.status(200).send({ message: 'Codigo guardado'}))
}

function verifyCodeSMS(req, res){
    let code = req.params.codeSMS
    CodeSMS.findOne({codeSMS: code}, (err, content) => {
        if(err) return res.status(500).send({ message: 'Error al procesar la solicitud'})
        if(!content) return res.status(404).send({ message: 'Codigo invalido'})
        res.status(200).send({ content: content})
    })
}

module.exports = {
    sendSMS,
    verifyCodeSMS
}