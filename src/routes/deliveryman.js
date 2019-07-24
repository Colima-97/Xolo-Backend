const router = require('express').Router();
const deliverymanCtrl = require('../controllers/deliveryman')
const emailCtrl = require('../controllers/email')
const codeSMS = require('../controllers/sms')
const auth = require('../middlewares/auth')
const sms = require('../controllers/sms')

router.get('/app/api/v1/deliveryman', auth, deliverymanCtrl.getDeliveryman)
router.get('/app/api/v1/deliveryman/:id_deliveryman', auth, deliverymanCtrl.getDeliverymanId)
router.post('/app/api/v1/deliveryman', auth, deliverymanCtrl.saveDeliveryman)
router.put('/app/api/v1/deliveryman/:id_deliveryman', auth, deliverymanCtrl.updateDeliveryman)
router.delete('/app/api/v1/deliveryman/:id_deliveryman', auth, deliverymanCtrl.deleteDeliveryman)
router.post('/app/api/v1/signUpDeliveryman', deliverymanCtrl.signUpDeliveryman)
router.post('/app/api/v1/deliveryman/email', emailCtrl.sendMail)
router.post('/app/api/v1/deliveryman/sendSMS', sms.sendSMS)
router.get('/app/api/v1/deliveryman/verifyCodeSMS/:codeSMS', codeSMS.verifyCodeSMS)

module.exports = router;