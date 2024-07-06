const meetingToDB = require('../models/meeting')

const getMeetings = async () => {
  return await meetingToDB.find({}).populate('client business')
}

const getMeetingById = async (id) => {
  return await meetingToDB.findById(id).populate('client business')
}

const getMeetingsByBusinessId = async (businessId) => {
  return await meetingToDB.find({ business: businessId }).populate('client business')
}

const getMeetingsByClientId = async (clientId) => {
  return await meetingToDB.find({ client: clientId }).populate('client business')
}

const createMeeting = async (meeting) => {
  try {
    const newMeeting = new meetingToDB(meeting)
    await newMeeting.save()
  } catch (err) {
    throw new Error(err.message)
  }
}

const updateMeeting = async (id, meeting) => {
  try {
    const updatedMeeting = await meetingToDB.findByIdAndUpdate(id, meeting, { new: true })
    if (!updatedMeeting) {
      throw new Error('Meeting not found')
    }
    return updatedMeeting
  } catch (error) {
    throw new Error(error.message)
  }
}

const deleteMeeting = async (id) => {
  try {
    const deletedMeeting = await meetingToDB.findByIdAndDelete(id)
    return deletedMeeting
  } catch (err) {
    throw new Error(`Error deleting meeting: ${err.message}`)
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
