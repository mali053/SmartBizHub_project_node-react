const mongoose = require('mongoose');
const { isEmail } = require('validator');
// const validate = require('../services/validateService');

const Schema = mongoose.Schema;
const saltRounds = 10;

const UserSchema = new Schema({
  username: { type: String, required: true, maxLength: 100 },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    validate: {
      validator: function (v) {
        return isEmail(v);
      },
      message: props => `${props.value} is not a valid email address!`
    },
    unique: true
  },
  userType: { type: String, required: true, enum: ['admin', 'client'] }
});


UserSchema.virtual('url').get(function () {
  return `/user/${this._id}`;
});

module.exports = mongoose.model('User', UserSchema);