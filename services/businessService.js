const businessToDB = require('../models/business')

const getBusinesses = async () => {
    const business = await businessToDB.find({})
    return business
}

const getBusinessById = async (id) => { return await businessToDB.findById(id) }

const getBusinessByUserId = async (userId) => { return await businessToDB.find({ owner: userId }) }

const createBusiness = async (business, owner) => {
    try {
        // Retrieve all businesses with the same name
        const existingBusiness = await businessToDB.findOne({ name: business.name });

        if (existingBusiness) {
            throw new Error('A business with this name already exists');
        }

        // Save the new business to the database
        const newBusiness = new businessToDB({ name: business.name, description: business.description, owner, address: business.address, email: business.email, phone: business.phoneNumber });
        await newBusiness.save();
    } catch (err) {
        throw new Error(err.message);
    }
};


const updateBusiness = async (id, business) => {
    try {
        const existingBusiness = await businessToDB.findOne({ name: business.name, _id: { $ne: id } });
        if (existingBusiness) {
            throw new Error('Business with this name already exists');
        } const businessToUpdate = await businessToDB.findByIdAndUpdate(id, business, { new: true });

        if (!businessToUpdate) {
            throw new Error('Business not found');
        }

        return businessToUpdate;
    } catch (error) {
        throw new Error(error.message);
    }
}

const deleteBusiness = async (id) => {
    try {
        const deletedBusiness = await businessToDB.findByIdAndDelete(id);
        return deletedBusiness;
    } catch (err) {
        throw new Error(`Error deleting business: ${err.message}`);
    }
}

module.exports = {
    getBusinesses,
    getBusinessById,
    getBusinessByUserId,
    createBusiness,
    updateBusiness,
    deleteBusiness
}