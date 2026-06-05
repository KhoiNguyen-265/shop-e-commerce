const mongoose = require("mongoose");
const os = require("os");
const process = require("process");

// Đếm connect đến MongoDB
const countConnect = () => {
    const numConnections = mongoose.connections.length;
    console.log(`Number of MongoDB connections: ${numConnections}`);
    return numConnections;
};

// Kiểm tra xem có quá tải kết nối không
const checkOverload = () => {
    setInterval(() => {
        const numConnections = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss / (1024 * 1024); // Convert to MB

        const maxConnections = numCores * 5; // Giả sử mỗi core có thể xử lý 5 kết nối

        // Chỉ in cảnh báo khi quá tải, tránh log liên tục mỗi 5 giây
        if (numConnections > maxConnections) {
            console.warn("Warning: MongoDB connection overload detected!");
            console.warn(
                `Current connections: ${numConnections}, Memory usage: ${memoryUsage.toFixed(2)} MB`,
            );
        }
    }, 5000); // Kiểm tra mỗi 5 giây
};

module.exports = {
    countConnect,
    checkOverload,
};
