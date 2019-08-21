const router = require('express').Router();
const deliverymanCtrl = require('../controllers/deliveryman')
//const emailCtrl = require('../controllers/email')
const codeSMS = require('../controllers/sms')
const auth = require('../middlewares/auth')
const sms = require('../controllers/sms')

router.get('/app/api/v1/deliveryman', auth, deliverymanCtrl.getDeliverymans)
router.put('/app/api/v1/deliveryman/updateStatus/:id_deliveryman', auth, deliverymanCtrl.updateStatusDeliveryman)
router.get('/app/api/v1/deliveryman/verifyPhoneNumber', deliverymanCtrl.verifyPhoneNumber)
router.get('/app/api/v1/deliveryman/verifyCode', deliverymanCtrl.verifyCode)
router.post('/app/api/v1/deliveryman/signUp', deliverymanCtrl.signUpDeliveryman)
//router.post('/app/api/v1/deliveryman/email', emailCtrl.sendMail)
router.post('/app/api/v1/deliveryman/sendSMS', sms.sendSMS)
router.get('/app/api/v1/deliveryman/verifyCodeSMS/:codeSMS', codeSMS.verifyCodeSMS)

module.exports = router;