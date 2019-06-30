const router = require('express').Router();
const deliverymanCtrl = require('../controllers/deliveryman')

router.get('/api/deliveryman', deliverymanCtrl.getDeliveryman)
router.get('/api/deliveryman/:id_deliveryman', deliverymanCtrl.getDeliverymanId)
router.post('/api/deliveryman', deliverymanCtrl.saveDeliveryman)
router.put('/api/deliveryman/:id_deliveryman', deliverymanCtrl.updateDeliveryman)
router.delete('/api/deliveryman/:id_deliveryman', deliverymanCtrl.deleteDeliveryman)

module.exports = router;