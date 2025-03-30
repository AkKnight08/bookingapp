const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: false },
  },
  { timestamps: true }
);

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return this.password === candidatePassword;
  } catch (error) {
    console.error('Password comparison error:', error);
    return false;
  }
};

// Export the model
const User = mongoose.model('User', userSchema);
module.exports = User;
