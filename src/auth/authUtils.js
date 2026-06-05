"use strict";

const JWT = require("jsonwebtoken");

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        // accessToken
        const accessToken = await JWT.sign(payload, privateKey, {
            algorithm: "RS256",
            expiresIn: "2 days",
        });

        // refreshToken
        const refreshToken = await JWT.sign(payload, privateKey, {
            algorithm: "RS256",
            expiresIn: "7 days",
        });

        return { accessToken, refreshToken };
    } catch (error) {
        console.error("createTokenPair error:", error);
        return null;
    }
};

module.exports = {
    createTokenPair,
};
