'use strict'

var twilio = require('twilio')
var config = require('../../config')
var codeSMS = require('../models/codeSMS')
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

module.exports = {
    sendSMS
}