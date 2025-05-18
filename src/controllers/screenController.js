import Screen from "../models/Screen.js";
import Cinema from "../models/Cinema.js";

export const addScreen = async (req, res) => {
  try {
    // if (req.user.role !== "admin") {
    //   return res
    //     .status(403)
    //     .json({ error: "Bạn không có quyền thực hiện hành động này" });
    // }

    const { cinemaID, roomNo, seats, capacity } = req.body;

    if (cinemaID == null || roomNo == null) {
      return res
        .status(400)
        .json({ error: "Yêu cầu phải có trường cinemaID và roomNo" });
    }

    // 2. Kiểm tra cinemaID có tồn tại không
    const cinemaExists = await Cinema.findById(cinemaID);
    if (!cinemaExists) {
      return res.status(404).json({
        success: false,
        error: "Rạp phim không tồn tại",
      });
    }

    // 3. Kiểm tra phòng chiếu (roomNo) có trùng trong cùng rạp không
    const existingScreen = await Screen.findOne({
      cinemaID,
      roomNo,
    });
    if (existingScreen) {
      return res.status(409).json({
        success: false,
        error: `Phòng ${roomNo} đã tồn tại trong rạp này`,
      });
    }

    const screen = new Screen({
      cinemaID,
      roomNo,
      seats: Array.isArray(seats) ? seats : [],
      capacity: capacity || 0,
    });

    await screen.save();
    res.status(201).json({ message: "Thêm phòng chiếu thành công", screen });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Lỗi server: " + error.message,
    });
  }
};

export const getScreen = async (req, res) => {
  try {
    // if (req.user.role !== "admin") {
    //   return res.status(403).json({
    //     error: "Bạn không có quyền!",
    //   });
    // }

    const screen = await Screen.find({});

    if (screen.length <= 0) {
      return res.status(404).json({
        error: "Không có phòng chiếu",
      });
    }

    res.status(200).json({
      success: true,
      count: screen.length,
      data: screen,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Lỗi server: " + error.message,
    });
  }
};

export const updateScreen = async (req, res) => {
  try {
    // if (req.user.role !== "admin") {
    //   return res.status(403).json({
    //     error: "Bạn không có quyền!",
    //   });
    // }

    const params = req.params.id;

    const screen = await Screen.findById(params);

    // Kiểm tra xem co ton tai movie voi cai id do khong
    if (screen == null) {
      return res.status(404).json({ error: "Phòng chiếu không tồn tại" });
    }

    const { cinemaID, roomNo, seats, capacity } = req.body;

    // 2. Kiểm tra cinemaID nếu có cập nhật
    if (cinemaID) {
      const cinemaExists = await Cinema.findById(cinemaID);
      if (!cinemaExists) {
        return res.status(404).json({
          success: false,
          error: "Rạp phim không tồn tại",
        });
      }
      screen.cinemaID = cinemaID;
    }

    // 3. Kiểm tra roomNo nếu có cập nhật
    if (roomNo) {
      // Kiểm tra trùng roomNo (loại trừ bản ghi hiện tại)
      const cinemaID = screen.cinemaID;
      const existingScreen = await Screen.findOne({
        cinemaID, // Dùng cinemaID mới nếu có cập nhật
        roomNo,
      });

      if (existingScreen) {
        return res.status(409).json({
          success: false,
          error: `Phòng ${roomNo} đã tồn tại trong rạp này`,
        });
      }
      screen.roomNo = roomNo;
    }

    if (capacity) screen.capacity = capacity;
    if (seats) screen.seats = seats;

    await screen.save();

    res.status(200).json({
      success: true,
      message: "Cập nhập thành công",
      data: screen,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Lỗi server: " + error.message,
    });
  }
};

export const deleteScreen = async (req, res) => {
  try {
    // if (req.user.role !== "admin") {
    //   return res
    //     .status(403)
    //     .json({ error: "Bạn không có quyền thực hiện hành động này" });
    // }

    const { screenNo } = req.body;

    const screen = await Screen.exists({ roomNo: screenNo });

    if (screen == null) {
      return res.status(200).json({ message: "Phòng chiếu không tồn tại" });
    }

    await Screen.findByIdAndDelete(screen._id);

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
