const router = require('express').Router();
const ordersCtrl = require('../controllers/orders')

router.get('/api/orders', ordersCtrl.getOrders)
router.get('/api/orders/:id_order', ordersCtrl.getOrdersId)
router.post('/api/orders', ordersCtrl.saveOrders)
router.put('/api/orders/:id_order', ordersCtrl.updateOrders)
router.delete('/api/orders/:id_order', ordersCtrl.deleteOrders)

module.exports = router;