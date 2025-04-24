import Screen from "../models/Screen.js";
import Seat from "../models/Seat.js";

export const addSeat = async (req, res) => {
  try {
    // if (req.user.role !== "admin") {
    //   return res
    //     .status(403)
    //     .json({ error: "Bạn không có quyền thực hiện hành động này" });
    // }

    const { screenID, seatNo, status } = req.body;

    if (!screenID || !seatNo) {
      return res
        .status(400)
        .json({ message: "Yêu cầu mã phòng chiếu và số ghế." });
    }

    const screenExists = await Screen.findById(screenID);
    if (!screenExists) {
      return res.status(404).json({
        success: false,
        error: "Phòng chiến không tồn tại",
      });
    }

    const existingSeat = await Seat.findOne({
      screenID,
      seatNo,
    });
    if (existingSeat) {
      return res.status(400).json({
        success: false,
        error: "Ghế đã tồn tại",
      });
    }

    const seat = new Seat({
      screenID,
      seatNo,
      status: status || "available",
    });

    await seat.save();
    res.status(201).json({ message: "Thêm chỗ ngồi thành công." });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Lỗi server: " + error.message,
    });
  }
};

export const getSeat = async (req, res) => {
  try {
    // if (req.user.role !== "admin") {
    //   return res
    //     .status(403)
    //     .json({ error: "Bạn không có quyền thực hiện hành động này" });
    // }

    const seat = await Seat.find({});

    if (seat.length <= 0) {
      return res.status(404).json({
        error: "Không có chỗ ngồi",
      });
    }
    res.status(200).json({
      success: true,
      count: seat.length,
      data: seat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Lỗi server: " + error.message,
    });
  }
};

export const updateSeat = async (req, res) => {
  try {
    // if (req.user.role !== "admin") {
    //   return res
    //     .status(403)
    //     .json({ error: "Bạn không có quyền thực hiện hành động này" });
    // }

    const params = req.params.id;

    const seat = await Seat.findById(params);

    if (!seat) {
      return res.status(404).json({ message: "Chỗ ngồi không tồn tại" });
    }

    const { screenID, seatNo, status } = req.body;

    if (screenID) {
      const screenExists = await Screen.findById(screenID);
      if (!screenExists) {
        return res.status(404).json({
          success: false,
          error: "Phòng chiến không tồn tại",
        });
      }
      seat.screenID = screenID;
    }

    if (seatNo) {
      const screenID = seat.screenID;
      const existingSeat = await Seat.findOne({
        screenID,
        seatNo,
      });
      if (existingSeat) {
        return res.status(400).json({
          success: false,
          error: "Ghế đã tồn tại",
        });
      }
      seat.seatNo = seatNo;
    }

    if (status) seat.status = status;

    await seat.save();

    res.status(200).json({
      success: true,
      message: "Cập nhập thành công",
      data: seat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Lỗi server: " + error.message,
    });
  }
};

export const deleteSeat = async (req, res) => {
  try {
    // if (req.user.role !== "admin") {
    //   return res
    //     .status(403)
    //     .json({ error: "Bạn không có quyền thực hiện hành động này" });
    // }

    const { seatID } = req.body;

    await Seat.findByIdAndUpdate(seatID);
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
