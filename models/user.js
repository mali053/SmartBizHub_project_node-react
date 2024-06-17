const mongoose = require('mongoose')
const { isEmail } = require('validator');

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: { type: String, required: true, maxLength: 100 },
  password: { type: String, required: true, minLength: 5 },
  phone: { type: String, required: true },
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
  userType: { type: String, required: true, enum: ['admin', 'client'] } // סוג משתמש: מנהל או לקוח
});


UserSchema.virtual('url').get(function () {
  return `/user/${this._id}`
})

module.exports = mongoose.model('User', UserSchema)