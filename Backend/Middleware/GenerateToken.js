const { raw } = require("express");
const { EncryptJWT } = require("jose");
const { encode } = require("jose/base64url");
const encoder = new TextEncoder();

async function GenerateToken(userId) {
    const raw = process.env.SECRET.slice(0, 32);
    const secret = encoder.encode(raw);

    console.log("Call Receive IN Generate Token");

    const JWE = await new EncryptJWT({ userId }).setProtectedHeader(
        { alg: "dir", enc: "A256GCM" }
    ).setIssuedAt().setExpirationTime("7d").encrypt(secret);

    console.log("Call Completed in JWE");
    return JWE;
}

module.exports=GenerateToken;