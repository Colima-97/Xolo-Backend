const router = require('express').Router();
const ctpCtrl = require('../controllers/company_third_party')

router.post('/app/api/v1/ctp', ctpCtrl.signUpCompanyThirdParty)

module.exports = router;