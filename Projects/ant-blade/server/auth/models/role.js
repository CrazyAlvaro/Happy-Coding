import mongoose from 'mongoose';
import {
  ADMIN_TYPE,
  SALE_FIN,
  SALE_ENT,
  REV_FIN,
  REV_ENT,
} from '../../../common/roleConstants';
const { Schema } = mongoose;

// see http://mongoosejs.com/docs/populate.html
const roleSchema = new Schema({
  roleName: {
    type: String,
    required: true,
  },
  roleType: {
    type: String,
    required: true,
    enum: [SALE_FIN, SALE_ENT, REV_FIN, REV_ENT, ADMIN_TYPE],
  },
  childRoles: [{
    type: Schema.Types.ObjectId,
    ref: 'role',
  }],
});

// roleName + roleType should be unique
roleSchema.index({
  roleName: 1,
  roleType: 1,
}, { unique: true });

export default mongoose.model('role', roleSchema);
