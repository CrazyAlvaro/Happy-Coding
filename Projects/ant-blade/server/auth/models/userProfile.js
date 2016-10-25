import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import isEmail from 'validator/lib/isEmail';
import { PLMErrorMsgs } from '../../../common/authConstants';

const { Schema } = mongoose;

const userProfileSchema = new Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return isEmail(v);
      },
      message: '{VALUE} 不是一个合法的 email 地址！',
    },
  },
  realName: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  roles: [{
    type: Schema.Types.ObjectId,
    ref: 'role',
    default: [],
  }],
});

// You're free to define your User how you like.
// Passport-Local Mongoose will add a username, hash and salt field
// to store the username, the hashed password and the salt value.
userProfileSchema.plugin(passportLocalMongoose, { errorMessages: PLMErrorMsgs });

export default mongoose.model('user_profile', userProfileSchema);
