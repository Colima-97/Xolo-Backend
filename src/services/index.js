'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../../config')
const shortid = require('shortid')

function createToken(){
    const payload = {
        sub: shortid.generate(),
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    }

    return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken(token){
    const decoded = new Promise((resolve, reject) => {
        try{
            const payload = jwt.decode(token, config.SECRET_TOKEN)
            resolve(payload.sub)
        }catch(err){
            if(err.message == 'Token expired'){
                var newToken = createToken()
                reject({
                    status: 200,
                    message: newToken
                })
            }else{
                reject({
                    status: 500,
                    message: 'Token invalido'
                })
            }
        }
    })
    return decoded
}

module.exports = {
    createToken,
    decodeToken
}