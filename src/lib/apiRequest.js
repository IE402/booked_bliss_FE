import axios from "axios";

const apiRequest = axios.create({
    baseURL: "http://localhost:8800/api", // URL của backend API
    headers: {
        "Content-Type": "application/json",
    },
    // Nếu cần, bạn có thể thêm các header khác tại đây
    withCredentials: true, 
});

// // Interceptor for Requests
// apiRequest.interceptors.request.use(
//     (config) => {
//         // Nếu cần, bạn có thể thêm các logic khác tại đây
//         console.log("Outgoing Request Config:", config);
//         return config;
//     },
//     (error) => {
//         // Xử lý lỗi trước khi gửi yêu cầu
//         console.error("Request Error:", error);
//         return Promise.reject(error);
//     }
// );

// // Interceptor for Responses
// apiRequest.interceptors.response.use(
//     (response) => {
//         // Xử lý phản hồi thành công
//         console.log("Response Data:", response.data);
//         return response;
//     },
//     (error) => {
//         // Xử lý lỗi phản hồi
//         if (error.response) {
//             const { status, data } = error.response;

//             if (status === 401) {
//                 console.warn("Unauthorized - Redirecting to login...");
//                 // // Chuyển hướng người dùng đến trang đăng nhập
//                 // window.location.href = "/login";
//             } else if (status === 403) {
//                 console.warn("Access Denied:", data.message || "You do not have permission to access this resource.");
//             } else if (status >= 500) {
//                 console.error("Server Error:", data.message || "An unexpected server error occurred.");
//             } else {
//                 console.error("Response Error:", data.message || "An error occurred.");
//             }
//         } else {
//             console.error("Network Error:", error.message || "Failed to connect to the server.");
//         }

//         return Promise.reject(error);
//     }
// );

export default apiRequest;
