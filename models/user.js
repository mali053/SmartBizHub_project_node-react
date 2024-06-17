const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: { type: String, required: true, maxLength: 100 },
  password: { type: String, required: true, minLength: 5 },
  phone: { type: String, required: true },
  email: { type: String },
  userType: { type: String, required: true, enum: ['admin', 'client'] } // סוג משתמש: מנהל או לקוח
})

UserSchema.virtual('url').get(function () {
  return `/user/${this._id}`
})

module.exports = mongoose.model('User', UserSchema)