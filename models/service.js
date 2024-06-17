const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ServiceSchema = new Schema({
  name: { type: String, required: true, maxLength: 30 },
  business: { type: Schema.Types.ObjectId, ref: 'Business', required: true },
  description: { type: String, required: true },
  price: { type: Number }
})

ServiceSchema.virtual('url').get(function () {
  return `/service/${this._id}`
})

module.exports = mongoose.model('Service', ServiceSchema)