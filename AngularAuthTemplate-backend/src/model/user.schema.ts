import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  image: {type: String, required: false},
  name: { type: String, required: true },
  surname: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  jwt: {type: String, required: false}
});

const User = mongoose.model('User', userSchema);

export default User;
