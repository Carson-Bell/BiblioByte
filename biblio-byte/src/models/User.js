import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
    },
});

userSchema.pre('save', async function(next) {
    try {
      // Check if the password has been modified
      if (!this.isModified('password')) return next();
      
      // Generate a salt and hash the password
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      
      next(); // Proceed to save
    } catch (error) {
      next(error); // Pass any errors to the next middleware
    }
  });

userSchema.methods.isValidPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

export default mongoose.models.User || mongoose.model("User", userSchema);

