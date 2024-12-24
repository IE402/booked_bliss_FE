export const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);  // Định dạng theo kiểu tiền tệ Việt Nam
  };