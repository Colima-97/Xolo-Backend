const router = require('express').Router();
const ordersCtrl = require('../controllers/orders')
const auth = require('../middlewares/auth')

router.get('/app/api/v1/orders', ordersCtrl.getOrders)
router.get('/app/api/v1/orders/:id_order', auth, ordersCtrl.getOrdersId)
router.post('/app/api/v1/orders', auth, ordersCtrl.saveOrders)
router.put('/app/api/v1/orders/updateStatus/:id_order', ordersCtrl.updateStatusOrder)

module.exports = router;