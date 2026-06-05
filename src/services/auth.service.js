"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const utils = require("util");
const KeyToKenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");

const generateKeyPairAsync = utils.promisify(crypto.generateKeyPair);

const RoleShop = {
    SHOP: "SHOP",
    WRITER: "WRITER",
    EDITOR: "EDITOR",
    ADMIN: "ADMIN",
};

class AuthService {
    static signUp = async ({ name, email, password }) => {
        try {
            // step 1: check email exist?
            const holderShop = await shopModel.findOne({ email }).lean();
            if (holderShop) {
                return {
                    code: "xxxx",
                    message: "Shop already registered!",
                };
            }

            const passwordHash = await bcrypt.hash(password, 10);

            const newShop = await shopModel.create({
                name,
                email,
                password: passwordHash,
                roles: [RoleShop.SHOP],
            });

            if (newShop) {
                // Created privateKey, publicKey
                const { privateKey, publicKey } = await generateKeyPairAsync(
                    "rsa",
                    {
                        modulusLength: 2048,
                        publicKeyEncoding: { type: "spki", format: "pem" },
                        privateKeyEncoding: { type: "pkcs8", format: "pem" },
                    },
                );

                console.log({ privateKey, publicKey });

                const publicKeyString = await KeyToKenService.createKeyToken({
                    userId: newShop._id,
                    publicKey,
                });

                if (!publicKeyString) {
                    return {
                        code: "xxxx",
                        message: "Create publicKey failed!",
                    };
                }

                // create token pair
                const tokens = await createTokenPair(
                    { userId: newShop._id, email },
                    publicKey,
                    privateKey,
                );

                if (!tokens) {
                    return {
                        code: "xxxx",
                        message: "Create token failed!",
                    };
                }

                console.log(`Created token success::`, tokens);

                return {
                    code: 201,
                    metadata: {
                        shop: {
                            name: getInfoData({
                                fields: ["_id", "name", "email"],
                                object: newShop,
                            }),
                            tokens,
                        },
                    },
                };
            }

            return {
                code: 200,
                metadata: null,
            };
        } catch (error) {
            return {
                code: "xxx",
                message: error.message,
                status: "error",
            };
        }
    };
}

module.exports = AuthService;
