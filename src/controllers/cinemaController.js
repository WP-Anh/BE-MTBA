import Cinema from "../models/Cinema.js";

export const addCinema = async (req, res) => {
  try {
    // if (req.user.role !== "admin") {
    //   return res
    //     .status(403)
    //     .json({ error: "Bạn không có quyền thực hiện hành động này" });
    // }

    const { cinemaName, address, contact_number, email } = req.body;

    if (!cinemaName || !address || !contact_number || !email) {
      res.status(500).json({
        success: false,
        error: "Yêu cầu nhập đầy đủ các trường thông tin",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: "Email không hợp lệ",
      });
    }

    if (!isValidPhone(contact_number)) {
      return res.status(400).json({
        success: false,
        error: "SĐT liên hệ không hợp lệ",
      });
    }

    const cinema = new Cinema({ cinemaName, address, contact_number, email });

    await cinema.save();

    res.status(200).json({
      success: true,
      message: "Thêm rạp phim thành công",
      date: Cinema,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Lỗi server: " + error.message,
    });
  }
};

export const getCinema = async (req, res) => {
  try {
    // if (req.user.role !== "admin") {
    //   return res.status(403).json({
    //     error: "Bạn không có quyền!",
    //   });
    // }

    const cinema = await Cinema.find({});

    if (cinema.length <= 0) {
      return res.status(404).json({
        error: "Không có rạp phim nào cả!",
      });
    }

    res.status(200).json({
      success: true,
      count: cinema.length,
      data: cinema,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Lỗi server: " + error.message,
    });
  }
};

export const updateCinema = async (req, res) => {
  try {
    // if (req.user.role !== "admin") {
    //   return res.status(403).json({
    //     error: "Bạn không có quyền!",
    //   });
    // }

    const params = req.params.id;

    const cinema = await Cinema.findById(params);

    // Kiểm tra xem có tồn tại cinema voi id do khong
    if (cinema == null) {
      return res.status(404).json({ error: "Không tồn tại rạp phim này!" });
    }

    const { cinemaName, address, contact_number, email } = req.body;

    if (cinemaName) cinema.cinemaName = cinemaName;
    if (address) cinema.address = address;
    if (contact_number) cinema.contact_number = contact_number;
    if (email) cinema.email = email;

    await cinema.save();

    res.status(200).json({
      success: true,
      message: "Cập nhập thành công",
      data: cinema,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Lỗi server: " + error.message,
    });
  }
};

export const deleteCinema = async (req, res) => {
  try {
    // if (req.user.role !== "admin") {
    //   return res
    //     .status(403)
    //     .json({ error: "Bạn không có quyền thực hiện hành động này" });
    // }

    const { cinemaName } = req.body;

    const cinema = await Cinema.exists({ cinemaName: cinemaName });

    if (cinema == null) {
      return res.status(404).json({ error: "Không tồn tại rạp phim này!" });
    }

    await Cinema.findByIdAndDelete(cinema._id);

    res.status(200).json({
      success: true,
      message: "Xóa thành công",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Lỗi server: " + error.message,
    });
  }
};
const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const isValidPhone = (phone) => {
  const regex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
  return regex.test(phone);
};
