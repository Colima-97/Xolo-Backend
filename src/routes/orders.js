const router = require('express').Router();
const ordersCtrl = require('../controllers/orders')
const auth = require('../middlewares/auth')

router.get('/app/api/v1/orders/restaurant', auth, ordersCtrl.getOrdersRestaurant)
router.get('/app/api/v1/orders/ctp', auth, ordersCtrl.getOrdersCompanyThirdParty)
router.get('/app/api/v1/orders/restaurant/:id_restaurant/:id_deliveryman', auth, ordersCtrl.getOrdersRestaurantId)
router.get('/app/api/v1/orders/ctp/:id_company_third_party/:id_deliveryman', auth, ordersCtrl.getOrdersCompanyThirdPartyId)
router.get('/app/api/v1/orders/:id_order', auth, ordersCtrl.getOrdersId)
router.post('/app/api/v1/orders', auth, ordersCtrl.saveOrders)
router.put('/app/api/v1/orders/updateStatus/:id_order', auth, ordersCtrl.updateStatusOrder)

module.exports = router;