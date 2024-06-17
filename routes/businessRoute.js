const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');

router.get('/', businessController.getBusinesses)
router.get('/userId', businessController.getBusinessByUserId)
router.post('/', businessController.createBusiness);
router.put('/:id', businessController.updateBusiness);
router.delete('/:id', businessController.deleteBusiness);

module.exports = router;
