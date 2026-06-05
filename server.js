require("dotenv").config();
const app = require("./src/app");

const port = process.env.PORT || process.env.DEV_APP_PORT || 3000;

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

process.on("SIGINT", () => {
    server.close(() => console.log(`Exit Server Express`));
});
