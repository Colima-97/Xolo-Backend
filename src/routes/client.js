const router = require('express').Router();
const clientCtrl = require('../controllers/client')

router.get('/api/client', clientCtrl.getClient)

router.get('/api/client/:id_client', clientCtrl.getClientId)

router.post('/api/client', clientCtrl.saveClient)

router.put('/api/client/:Id_client', clientCtrl.updateClient)

router.delete('/api/client/:Id_client', clientCtrl.deleteClient)
module.exports = router;