import mongoose from 'mongoose';

const { Schema } = mongoose;

const mongoSchema = new Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: String,
  avatarUrl: String,
});

const User = mongoose.model('User', mongoSchema);

export default User;

// googleId: {
//   type: String,
//   required: true,
//   unique: true,
// },
// googleToken: {
//   access_token: String,
//   refresh_token: String,
//   token_type: String,
//   expiry_date: Number,
// },

// },
// isAdmin: {
//   type: Boolean,
//   default: false,
// },
