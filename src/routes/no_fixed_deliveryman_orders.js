const router = require('express').Router();
const nfdoCtrl = require('../controllers/no_fixed_deliveryman_orders')
const auth = require('../middlewares/auth')

router.get('/app/api/v1/nfdo', auth, nfdoCtrl.getNfdo)
router.get('/app/api/v1/nfdo/:idOrder', auth, nfdoCtrl.getNfdoId)
router.get('/app/api/v1/nfdo/restaurant/:id_restaurant', auth, nfdoCtrl.getOrdersIdRestaurantNfdo)
router.post('/app/api/v1/nfdo', auth, nfdoCtrl.saveNfdo)
router.put('/app/api/v1/nfdo/:idOrder', auth, nfdoCtrl.updateStatusNfdo)

module.exports = router;