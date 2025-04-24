import Ticket from "../models/Ticket.js";
import ShowTime from "../models/ShowTime.js";
import User from "../models/User.js";
import Seat from "../models/Seat.js";

export const addTicket = async (req, res) => {
  try {
    const { showID, userID, screenID, seatID, price, status, expiresAt } =
      req.body;

    if (!showID || !userID || !screenID || !seatID) {
      return res
        .status(400)
        .json({ message: "Yêu cầu phải có trường showID, userID, seatNo" });
    }

    const existingShow = await ShowTime.findById(showID);
    if (!existingShow) {
      return res
        .status(404)
        .json({ message: "Không có lịch hẹn chiếu phim này" });
    }

    const existingUser = await User.findById(userID);
    if (!existingUser) {
      return res.status(404).json({ message: "Không có người dùng này" });
    }

    const existingScreen = await Screen.findById(screenID);
    if (!existingScreen) {
      return res.status(404).json({ message: "Không có người dùng này" });
    }

    const existingSeat = await Seat.findById(seatID);
    if (!existingSeat) {
      return res.status(404).json({ message: "Không có ghế ngồi này" });
    }

    const ticket = new Ticket({
      showID,
      userID,
      screenID,
      seatID,
      price: price || 0,
      status: status || "",
      expiresAt: expiresAt || "",
    });

    await ticket.save();

    res.status(201).json({ message: "Thêm vé thành công", ticket });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Lỗi server: " + error.message,
    });
  }
};

export const showTicket = async (req, res) => {
  try {
    // if (req.user.role !== "admin") {
    //   return res.status(403).json({
    //     error: "Bạn không có quyền!",
    //   });
    // }

    const ticket = await Ticket.find({});

    if (ticket.length <= 0) {
      return res.status(404).json({
        error: "Không có vé được đặt",
      });
    }

    res.status(200).json({
      success: true,
      count: ticket.length,
      data: ticket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Lỗi server: " + error.message,
    });
  }
};

export const deleteTicket = async (req, res) => {
  try {
    // if (req.user.role !== "admin") {
    //   return res
    //     .status(403)
    //     .json({ error: "Bạn không có quyền thực hiện hành động này" });
    // }

    const { ticketID } = req.body;

    const ticket = await Screen.exists({ ticketID: ticketID });

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
