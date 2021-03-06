import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt';
import uniqueValidator from 'mongoose-unique-validator';

mongoose.plugin(uniqueValidator);

const UserSchema = new Schema({
  email: {
    type: String,
    unique: 'User with email "{VALUE}" already exist',
    lowercase: true,
    required: 'Email is required',
  },
  password: {
    type: String,
    required: 'Password is required',
  },
  firstName: {
    type: String,
    lowercase: true,
    required: 'First name is required',
  },
  lastName: {
    type: String,
    lowercase: true,
    required: 'Last name is required',
  },
}, {
  timestamp: true,
});

UserSchema.statics.createFields = [
  'email',
  'password',
  'firstName',
  'lastName',
];

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = bcrypt.getSaltSync(10);

  this.password = bcrypt.hashSync(this.password, salt);
  next();
});


UserSchema.statics.findOneWithPublicFields = function(params, cb) {
  return this.findOne(params, cb).select({password: 0, _id: 0, __v: 0});
};

export default mongoose.model('user', UserSchema);
