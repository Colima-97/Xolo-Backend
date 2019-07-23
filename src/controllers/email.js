'use strict'

var nodemailer = require('nodemailer')


function sendMail(req, res){
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        secure: true,
        auth: {
            user: 'xoloapp19@gmail.com',
            pass: 'xoloapplemonlabs19'
        },
        tls:{
            rejectUnauthorized: false
        }
    })

    var mailOptions = {
        from: 'Equipo de XoloApp',
        to: req.body.email,
        subject: 'Reestablecimiento de contraseña',
        text: 'Para reesablecer su contraseña por favor entre al siguiente link'
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) return res.status(500).send({ message: `Error: ${err}`})
        res.status(200).jsonp(req.body);
    })
}

module.exports = {
    sendMail
}