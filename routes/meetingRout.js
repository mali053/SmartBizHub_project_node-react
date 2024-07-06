const express = require('express')
const router = express.Router()
const meetingController = require('../controllers/meetingController')

router.get('/', meetingController.getMeetings)
router.get('/:id', meetingController.getMeetingById)
router.get('/business/:businessId', meetingController.getMeetingsByBusinessId)
router.get('/client/:clientId', meetingController.getMeetingsByClientId)
router.post('/', meetingController.createMeeting)
router.put('/:id', meetingController.updateMeeting)
router.delete('/:id', meetingController.deleteMeeting)

module.exports = router