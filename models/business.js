const mongoose = require('mongoose')
const { isEmail } = require('validator');

const Schema = mongoose.Schema

const BusinessSchema = new Schema({
    name: { type: String, required: true, maxLength: 30 },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String },
    address: { type: String },
    email: { 
        type: String,
        validate: {
          validator: function(v) {
            return isEmail(v); // בדיקת תקינות האימייל באמצעות ה-validator של Mongoose
          },
          message: props => `${props.value} is not a valid email address!`
        },
        unique: true // אימות שהאימייל הוא ייחודי במסד הנתונים
      },
    phoneNumber: {type: String}
})

BusinessSchema.virtual('url').get(function () {
    return `/business/${this._id}`
})

module.exports = mongoose.model('Business', BusinessSchema)