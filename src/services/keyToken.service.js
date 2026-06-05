"use strict";

const keyTokenModel = require("../models/keyToken.model");

class KeyToKenService {
    static createKeyToken = async ({ userId, publicKey, privateKey }) => {
        try {
            const tokens = await keyTokenModel.create({
                user: userId,
                publickey,
                privateKey,
            });

            return tokens ? tokens.publicKey : null;
        } catch (error) {
            return error;
        }
    };
}

module.exports = KeyToKenService;
