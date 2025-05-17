import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Đăng ký người dùng
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Email không hợp lệ" });
    }
    if (await isEmailExist(email)) {
      console.log(isEmailExist(email));
      return res.status(400).json({ error: "Email đã tồn tại" });
    }
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Đăng nhập
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Email không hợp lệ" });
    }
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error("Invalid credentials");

    // Tạo JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// Lấy thông tin người dùng (cần xác thực)
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
};

// Lấy thông tin toàn bộ người dùng(ko cần xác thực)
export const getAllProfile = async (req, res) => {
  try {
    // if (req.user.role !== "admin") {
    //   return res.status(403).json({
    //     error: "Bạn không có quyền!",
    //   });
    // }

    const user = await User.find();

    if (user.length <= 0) {
      return res.status(404).json({
        error: "Không có phim nào cả!",
      });
    }

    res.status(200).json({
      success: true,
      count: user.length,
      data: user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Lỗi server: " + error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { email, password, newPassword } = req.body;

    // Kiểm tra xem người dùng có nhập đầy đủ không
    if (!email || !password || !newPassword) {
      return res.status(400).json({ error: "Vui lòng điền đầy đủ thông tin" });
    }

    // Kiểm tra xem email có hợp lệ không
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Email không hợp lệ" });
    }

    // Kiểm tra xem mk mới có giống mk cũ không
    if (newPassword == password) {
      return res
        .status(400)
        .json({ error: "Hãy nhập mật khẩu mới khác mật khẩu cũ" });
    }

    // Kiểm tra xem có tồn tại email không
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    // Kiểm tra xem mật khẩu có khớp không
    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error("Invalid credentials");

    user.password = newPassword;

    await user.save();

    // Tạo token mới
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      success: true,
      message: "Thay đổi mật khẩu thành công",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Lỗi server: " + error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
};

const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const isEmailExist = async (e) => {
  const exist = await User.exists({ email: e });
  return Boolean(exist);
};

const isValidPhone = (phone) => {
  const regex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
  return regex.test(phone);
};
