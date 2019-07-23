const router = require('express').Router();
const nfdoCtrl = require('../controllers/no_fixed_deliveryman_orders')

router.get('/api/nfdo', nfdoCtrl.getNfdo)
router.get('/api/nfdo/:id_deliveryman', nfdoCtrl.getNfdoId)
router.post('/api/nfdo', nfdoCtrl.saveNfdo)
router.put('/api/nfdo/:id_deliveryman', nfdoCtrl.updateNfdo)
router.delete('/api/nfdo/:id_deliveryman', nfdoCtrl.deleteNfdo)

module.exports = router;