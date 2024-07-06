const serviceService = require('../services/serviceService')

const getServices = async (req, res) => {
  try {
    const services = await serviceService.getServices()
    res.send(services)
  } catch (error) {
    console.error(`Error fetching services: ${error.message}`)
    res.status(500).send(`Error fetching services: ${error.message}`)
  }
}

const getServiceById = async (req, res) => {
  try {
    const { id } = req.params
    const service = await serviceService.getServiceById(id)
    if (!service) {
      res.status(404).send('Service not found')
    } else {
      res.send(service)
    }
  } catch (error) {
    console.error(`Error fetching service: ${error.message}`)
    res.status(500).send(`Error fetching service: ${error.message}`)
  }
}

const getServicesByBusinessId = async (req, res) => {
  try {
    const { businessId } = req.params
    const services = await serviceService.getServicesByBusinessId(businessId)
    res.send(services)
  } catch (error) {
    console.error(`Error fetching services by business ID: ${error.message}`)
    res.status(500).send(`Error fetching services by business ID: ${error.message}`)
  }
}

const createService = async (req, res) => {
  try {
    const service = req.body
    await serviceService.createService(service)
    res.status(201).send('Service created successfully')
  } catch (error) {
    console.error(`Error creating service: ${error.message}`)
    res.status(500).send(`Error creating service: ${error.message}`)
  }
}

const updateService = async (req, res) => {
  try {
    const { id } = req.params
    const service = req.body
    const updatedService = await serviceService.updateService(id, service)
    res.send(updatedService)
  } catch (error) {
    console.error(`Error updating service: ${error.message}`)
    res.status(500).send(`Error updating service: ${error.message}`)
  }
}

const deleteService = async (req, res) => {
  try {
    const { id } = req.params
    await serviceService.deleteService(id)
    res.send('Service deleted successfully')
  } catch (error) {
    console.error(`Error deleting service: ${error.message}`)
    res.status(500).send(`Error deleting service: ${error.message}`)
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
