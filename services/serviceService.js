const serviceToDB = require('../models/service')

const getServices = async () => {
  return await serviceToDB.find({}).populate('business')
}

const getServiceById = async (id) => {
  return await serviceToDB.findById(id).populate('business')
}

const getServicesByBusinessId = async (businessId) => {
  return await serviceToDB.find({ business: businessId }).populate('business')
}

const createService = async (service) => {
  try {
    const newService = new serviceToDB(service)
    await newService.save()
  } catch (err) {
    throw new Error(err.message)
  }
}

const updateService = async (id, service) => {
  try {
    const updatedService = await serviceToDB.findByIdAndUpdate(id, service, { new: true })
    if (!updatedService) {
      throw new Error('Service not found')
    }
    return updatedService
  } catch (error) {
    throw new Error(error.message)
  }
}

const deleteService = async (id) => {
  try {
    const deletedService = await serviceToDB.findByIdAndDelete(id)
    return deletedService
  } catch (err) {
    throw new Error(`Error deleting service: ${err.message}`)
  }
}

module.exports = {
  getServices,
  getServiceById,
  getServicesByBusinessId,
  createService,
  updateService,
  deleteService
}
