import Movie from "../models/Movie.js";

export const addNewMovie = async (req, res) => {
  try {
    // if (req.user.role !== "admin") {
    //   return res
    //     .status(403)
    //     .json({ error: "Bạn không có quyền thực hiện hành động này" });
    // }

    const {
      title,
      description,
      director,
      genre,
      duration,
      rating,
      release_date,
      poster,
      img,
    } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Yêu cầu phải có trường title" });
    }

    const movie = new Movie({
      title,
      description: description || "",
      director: director || "",
      genre: genre || "",
      duration: duration || "",
      rating: rating || "",
      release_date: release_date || "",
      poster: poster || "",
      img: img || "",
    });

    await movie.save();
    res.status(201).json({ message: "Thêm movie thành công", movie });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMovie = async (req, res) => {
  try {
    // if (req.user.role !== "admin") {
    //   return res.status(403).json({
    //     error: "Bạn không có quyền!",
    //   });
    // }

    const movie = await Movie.find({});

    if (movie.length <= 0) {
      return res.status(404).json({
        error: "Không có phim nào cả!",
      });
    }

    res.status(200).json({
      success: true,
      count: movie.length,
      data: movie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Lỗi server: " + error.message,
    });
  }
};

export const updateMovie = async (req, res) => {
  try {
    // if (req.user.role !== "admin") {
    //   return res.status(403).json({
    //     error: "Bạn không có quyền!",
    //   });
    // }

    const params = req.params.id;

    const movie = await Movie.findById(params);

    // Kiểm tra xem co ton tai movie voi cai id do khong
    if (movie == null) {
      return res.status(404).json({ error: "Phim không tồn tại" });
    }

    const {
      title,
      description,
      director,
      genre,
      duration,
      rating,
      release_date,
      poster,
      img,
    } = req.body;

    if (title) movie.title = title;
    if (description) movie.description = description;
    if (director) movie.director = director;
    if (genre) movie.genre = genre;
    if (duration) movie.duration = duration;
    if (rating) movie.rating = rating;
    if (release_date) movie.release_date = release_date;
    if (poster) movie.poster = poster;
    if (img) movie.img = img;

    await movie.save();

    res.status(200).json({
      success: true,
      message: "Cập nhập thành công",
      data: movie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Lỗi server: " + error.message,
    });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    // if (req.user.role !== "admin") {
    //   return res
    //     .status(403)
    //     .json({ error: "Bạn không có quyền thực hiện hành động này" });
    // }

    const { movieName } = req.body;

    const movie = await Movie.exists({ title: movieName });

    if (movie == null) {
      return res.status(200).json({ message: "Phim không tồn tại" });
    }

    await Movie.findByIdAndDelete(movie._id);

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
