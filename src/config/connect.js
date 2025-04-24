import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Kết nối thành công!");
  } catch (error) {
    console.log("Lỗi kết nối tới MongoDB! ", error.message);
    process.exit(1);
  }
};

export default connectDB;
