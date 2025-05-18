import ShowTime from "../models/ShowTime.js";
import Movie from "../models/Movie.js";
import Screen from "../models/Screen.js";

export const addShow = async (req, res) => {
  try {
    // if (req.user.role !== "admin") {
    //   return res
    //     .status(403)
    //     .json({ error: "Bạn không có quyền thực hiện hành động này" });
    // }

    const { movieID, screenID, startTime, endTime } = req.body;

    if (!movieID || !screenID) {
      return res
        .status(400)
        .json({ message: "Yêu cầu có trường movieID và screenID" });
    }

    const existingMovie = await Movie.findById(movieID);
    if (!existingMovie) {
      return res.status(404).json({ message: "Phim không tồn tại" });
    }

    const existingScreen = await Screen.findById(screenID);
    if (!existingScreen) {
      return res.status(404).json({ message: "Phòng chiếu không tồn tại" });
    }

    if (startTime && endTime) {
      if (startTime >= endTime) {
        return res.status(400).json({ message: "Lịch chiếu không hợp lệ" });
      }
    }

    const show = new ShowTime({
      movieID,
      screenID,
      startTime: startTime || null,
      endTime: endTime || null,
    });

    await show.save();
    res.status(201).json({ message: "Thêm lịch chiếu thành công", show });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Lỗi server: " + error.message,
    });
  }
};

export const getShow = async (req, res) => {
  try {
    // if (req.user.role !== "admin") {
    //   return res
    //     .status(403)
    //     .json({ error: "Bạn không có quyền thực hiện hành động này" });
    // }

    const show = await ShowTime.find({});

    if (show.length <= 0) {
      return res.status(404).json({
        error: "Không có lịch chiếu",
      });
    }

    res.status(200).json({
      success: true,
      count: show.length,
      data: show,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Lỗi server: " + error.message,
    });
  }
};

export const updateShow = async (req, res) => {
  try {
    // if (req.user.role !== "admin") {
    //   return res.status(403).json({
    //     error: "Bạn không có quyền!",
    //   });
    // }

    const params = req.params.id;

    const show = await Screen.findById(params);

    // Kiểm tra xem co ton tai movie voi cai id do khong
    if (show == null) {
      return res.status(404).json({ error: "Lịch chiếu không tồn tại" });
    }

    const { movieID, screenID, startTime, endTime } = req.body;

    // 2. Kiểm tra cinemaID nếu có cập nhật
    if (movieID) {
      const existingMovie = await Movie.findById(movieID);
      if (!existingMovie) {
        return res.status(404).json({
          success: false,
          error: "Phim không tồn tại",
        });
      }
      show.movieID = movieID;
    }

    // 3. Kiểm tra roomNo nếu có cập nhật
    if (screenID) {
      // Kiểm tra trùng roomNo (loại trừ bản ghi hiện tại)
      const existingScreen = await Screen.findById(screenID);
      if (!existingScreen) {
        return res.status(404).json({
          success: false,
          error: "Phòng chiếu không tồn tại",
        });
      }
      show.screenID = screenID;
    }

    if (startTime) {
      if (startTime >= endTime) {
        return res.status(400).json({ message: "Lịch phát sóng không hợp lệ" });
      }
      show.startTime = startTime;
    }
    if (endTime) {
      if (endTime < startTime) {
        return res
          .status(400)
          .json({ message: "Lịch kết thúc phim phải lớn hơn lịch phát sóng" });
      }
      show.endTime = endTime;
    }

    await show.save();

    res.status(200).json({
      success: true,
      message: "Cập nhập thành công",
      data: show,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Lỗi server: " + error.message,
    });
  }
};

export const deleteShow = async (req, res) => {
  try {
    // if (req.user.role !== "admin") {
    //   return res
    //     .status(403)
    //     .json({ error: "Bạn không có quyền thực hiện hành động này" });
    // }

    const { showID } = req.body;

    const show = await ShowTime.exists({ _id: showID });

    if (!show) {
      return res.status(200).json({ message: "Lịch chiếu không tồn tại" });
    }

    await ShowTime.findByIdAndDelete(show._id);

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
