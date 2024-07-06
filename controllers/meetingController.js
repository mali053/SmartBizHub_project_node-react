const meetingService = require('../services/meetingService')

const getMeetings = async (req, res) => {
  try {
    const meetings = await meetingService.getMeetings()
    res.send(meetings)
  } catch (error) {
    console.error(`Error fetching meetings: ${error.message}`)
    res.status(500).send(`Error fetching meetings: ${error.message}`)
  }
}

const getMeetingById = async (req, res) => {
  try {
    const { id } = req.params
    const meeting = await meetingService.getMeetingById(id)
    if (!meeting) {
      res.status(404).send('Meeting not found')
    } else {
      res.send(meeting)
    }
  } catch (error) {
    console.error(`Error fetching meeting: ${error.message}`)
    res.status(500).send(`Error fetching meeting: ${error.message}`)
  }
}

const getMeetingsByBusinessId = async (req, res) => {
  try {
    const { businessId } = req.params
    const meetings = await meetingService.getMeetingsByBusinessId(businessId)
    res.send(meetings)
  } catch (error) {
    console.error(`Error fetching meetings by business ID: ${error.message}`)
    res.status(500).send(`Error fetching meetings by business ID: ${error.message}`)
  }
}

const getMeetingsByClientId = async (req, res) => {
  try {
    const { clientId } = req.params
    const meetings = await meetingService.getMeetingsByClientId(clientId)
    res.send(meetings)
  } catch (error) {
    console.error(`Error fetching meetings by client ID: ${error.message}`)
    res.status(500).send(`Error fetching meetings by client ID: ${error.message}`)
  }
}

const createMeeting = async (req, res) => {
  try {
    const meeting = req.body
    await meetingService.createMeeting(meeting)
    res.status(201).send('Meeting created successfully')
  } catch (error) {
    console.error(`Error creating meeting: ${error.message}`)
    res.status(500).send(`Error creating meeting: ${error.message}`)
  }
}

const updateMeeting = async (req, res) => {
  try {
    const { id } = req.params
    const meeting = req.body
    const updatedMeeting = await meetingService.updateMeeting(id, meeting)
    res.send(updatedMeeting)
  } catch (error) {
    console.error(`Error updating meeting: ${error.message}`)
    res.status(500).send(`Error updating meeting: ${error.message}`)
  }
}

const deleteMeeting = async (req, res) => {
  try {
    const { id } = req.params
    await meetingService.deleteMeeting(id)
    res.send('Meeting deleted successfully')
  } catch (error) {
    console.error(`Error deleting meeting: ${error.message}`)
    res.status(500).send(`Error deleting meeting: ${error.message}`)
  }
}

module.exports = {
  getMeetings,
  getMeetingById,
  getMeetingsByBusinessId,
  getMeetingsByClientId,
  createMeeting,
  updateMeeting,
  deleteMeeting
}
