const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MeetingSchema = new Schema({
    scheduledDateTime: { type: Date, required: true },
    duration: { type: String, required: true },
    service: { type: Schema.Types.ObjectId, ref: 'Service', required: true }, // השירות המוזמן לפגישה
    client: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // הלקוח שמזמין את הפגישה
    business: { type: Schema.Types.ObjectId, ref: 'Business', required: true }, 
    status: { type: String, enum: ['scheduled', 'completed', 'canceled'], default: 'scheduled' },
    note: { type: String }
})

MeetingSchema.virtual('url').get(function () {
    return `/meeting/${this._id}`
})

module.exports = mongoose.model('Meeting', MeetingSchema)