const router = require('express').Router();
const ctpCtrl = require('../controllers/company_third_party')

router.get('/api/ctp', ctpCtrl.getCompanyThirdParty)
router.get('/api/ctp/:id_tpuser', ctpCtrl.getCompanyThirdPartyId)
router.post('/api/ctp', ctpCtrl.saveCompanyThirdParty)
router.put('/api/ctp/:id_tpuser', ctpCtrl.updateCompanyThirdParty)
router.delete('/api/ctp/:id_tpuser', ctpCtrl.deleteCompanyThirdParty)

module.exports = router;