const express = require('express')
const router = express.Router()
const serviceController = require('../controllers/serviceController')

router.get('/', serviceController.getServices)
router.get('/:id', serviceController.getServiceById)
router.get('/business/:businessId', serviceController.getServicesByBusinessId)
router.post('/', serviceController.createService)
router.put('/:id', serviceController.updateService)
router.delete('/:id', serviceController.deleteService)

module.exports = router