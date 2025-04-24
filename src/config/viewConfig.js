import express from "express";

function viewConfig(app) {
  app.use(express.static("public"));
}

export default viewConfig;
/**
 * Phim
 * +    Create
 * +    Read(Search/Filter)
 * +    Update
 * +    Delete
 */

/**
 * Người dùng
 * +    Register
 * +    Login
 * +    Update Profile
 * +    xem lịch sử phim đã coi
 * +    Xem lịch sử vé
 */

/**
 * Vé
 * +    CREATE
 * +    Read
 */
// thông tin phòng chiếu

/**
 * Phòng chiếu
 * +    Thêm
 * +    Thêm khung giờ
 * +    Sửa | Xóa
 */
// thông tin rạp
