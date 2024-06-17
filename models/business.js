const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BusinessSchema = new Schema({
    name: { type: String, required: true, maxLength: 30 },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String },
})

BusinessSchema.virtual('url').get(function () {
    return `/business/${this._id}`
})

module.exports = mongoose.model('Business', BusinessSchema)