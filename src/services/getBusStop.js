document.querySelectorAll('.Nv2PK.Q2HXcd.THOPZb').forEach(element => {
    // Lấy nội dung văn bản từ thẻ
    const textContent = element.textContent.trim();
    console.log(`Nội dung thẻ: ${textContent}`);

    // Giả lập sự kiện click (nếu cần thực hiện hành động trên trang)
    element.click();

    // Lấy URL từ thẻ <a> bên trong (nếu có)
    const url = element.querySelector('a')?.href;

    if (url) {
        // Hàm trích xuất tọa độ từ URL
        const extractCoordinates = (url) => {
            const latLngMatch = url.match(/@([\d.]+),([\d.]+),/); // Định dạng @latitude,longitude,
            if (latLngMatch) {
                return { latitude: latLngMatch[1], longitude: latLngMatch[2] };
            }

            const altLatMatch = url.match(/3d([\d.]+)!4d([\d.]+)/); // Định dạng !3dlatitude!4dlongitude
            if (altLatMatch) {
                return { latitude: altLatMatch[1], longitude: altLatMatch[2] };
            }

            return null; // Không tìm thấy tọa độ
        };

        // Trích xuất tọa độ từ URL
        const coordinates = extractCoordinates(url);

        if (coordinates) {
            console.log(`Tọa độ: Latitude = ${coordinates.latitude}, Longitude = ${coordinates.longitude}`);
        } else {
            console.log("Không tìm thấy tọa độ trong URL.");
        }
    } else {
        console.log("Thẻ này không chứa URL.");
    }
});
