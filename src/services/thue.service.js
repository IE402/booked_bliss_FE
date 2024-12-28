import apiRequest from "../lib/apiRequest";

export const thueService = {
  async addHopDong(hopDongDto) {
    try {
      const res = await apiRequest.post("/thues", hopDongDto);
      console.log("Thêm hợp đồng:", res.data);
      return res.data;
    } catch (err) {
      console.error("Lỗi khi thêm hợp đồng:", err);
      return null; // Trả về giá trị an toàn
    }
  },

  async getAllHopDongByUserId(userId) {
    try {
      const res = await apiRequest.get(`/thues/${userId}`);
      console.log("Danh sách hợp đồng:", res.data);
      return res.data;
    } catch (err) {
      console.error("Lỗi khi lấy danh sách hợp đồng:", err);
      return []; // Trả về mảng rỗng để tránh lỗi ở phía giao diện
    }
  },
};
