const businessToDB = require('../models/business')

const getBusinesses = async () => {
    const business = await businessToDB.find({})
    return business
}

const getBusinessById = async (id) => { return await businessToDB.findById(id) }

const getBusinessByUserId = async (userId) => { return await businessToDB.find({ owner: userId }) }

const createBusiness = async (name, description, owner) => {
    try {
        // שליפת כל המשתמשים עם אותו שם משתמש
        const existingBusiness = await businessToDB.findOne({ name });

        if (existingBusiness)
            throw new Error('already exists business with this name')

        // Save new business to the database
        const newBusiness = new businessToDB({ name, description, owner });
        await newBusiness.save();
    } catch (err) {
        throw new Error(err.message);
    }
};

const updateBusiness = async (id, business) => {
    try {
        const businessToUpdate = await businessToDB.findByIdAndUpdate(id, business, { new: true });

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