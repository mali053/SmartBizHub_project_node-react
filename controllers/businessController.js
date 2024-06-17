const business = require('../models/business')
const businessService = require('../services/businessService')

const getBusinesses = async (req, res) => {
    try {
        const { businessId } = req.query
        if (businessId) {
            const business = await businessService.getBusinessById(businessId)
            if(!business) {
                res.status(404).send('Business not found')
            }
            else{
                res.send(business)
            }
        }
        else {
            const businesses = await businessService.getBusinesses()
            console.log(businesses);

            res.send(businesses)
        }
    } catch (error) {
        console.error(`error in fetch business ${error.message}`);
        res.status(500).send(`error in fetch business ${error.message}`);
    }
}

const getBusinessByUserId = async (req, res) => {
    console.log("getBusinessByUserId");
    try {
        const userId = req.user.id
        console.log(userId);
        const business = await businessService.getBusinessByUserId(userId)
        res.send(business)
    } catch (error) {
        console.error(`error in fetch business ${error.message}`);
        res.status(500).send(`error in fetch business ${error.message}`);
    }
}

const createBusiness = async (req, res) => {
    try {
        const business = req.body
        const owner = req.user.id
        await businessService.createBusiness(business, owner)
        res.status(201).send('the business created successfully');
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
}

const updateBusiness = async (req, res) => {
    try {
        const businessDetails = req.body
        const id = req.params.id
        if (!id || !businessDetails) {
            console.error('missing business or id');
            return res.status(400).send('missing business or id');
        }
        const updatedBusiness = await businessService.updateBusiness(id, businessDetails)
        res.send(updatedBusiness)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}

const deleteBusiness = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            console.error('missing id');
            return res.status(400).send('missing id');
        }

        const deleteBusiness = await businessService.deleteBusiness(id)
        res.send(deleteBusiness)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}

module.exports = {
    getBusinesses,
    getBusinessByUserId,
    createBusiness,
    updateBusiness,
    deleteBusiness
}