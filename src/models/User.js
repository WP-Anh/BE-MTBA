import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  fullname: String,
  password: { type: String, required: true },
  phone: Number,
  role: { type: String, enum: ["user", "admin"], default: "user" },
  status: { type: String, enum: ["active", "banned"], default: "active" },
  img: String,
});

// Mã hóa mật khẩu
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Kiểm tra password
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
