"use strict";

const mongoose = require("mongoose");
const config = require("../configs/config.mongodb");

const connectString = config.db.uri;

// Connection event logs to help debug connection status
mongoose.connection.on("connected", () => {
    console.log("MongoDB connected");
});

mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected");
});

class Database {
    constructor() {
        this.connect();
    }

    // Connect function to MongoDB
    async connect(type = "mongodb") {
        // Debug mode for development environment
        if (process.env.NODE_ENV === "dev") {
            mongoose.set("debug", true);
            mongoose.set("debug", { color: true });
        }

        try {
            // maxPoolSize: maximum number of connections in the connection pool
            await mongoose.connect(connectString, {
                maxPoolSize: 50,
            });
        } catch (error) {
            console.log("Error connecting to MongoDB:", error);

            // // Retry connection after 5 seconds if there is an error
            console.log("Retrying connection in 5 seconds...");
            setTimeout(() => {
                this.connect(type);
            }, 5000);

            mongoose.connection.on("disconnected", () => {
                console.warn(
                    "MongoDB connection lost. Attempting to reconnect...",
                );
            });
        }
    }

    // Singleton pattern to ensure only one instance of Database is created
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

// Export the singleton instance of Database
const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;
