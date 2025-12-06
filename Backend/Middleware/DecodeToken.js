const { decodeJwt } = require("jose");
const decoder = new TextEncoder();
const secret = decoder.encode(process.env.SECRET.slice(0, 32));

async function DecodeToken(req, res, next) {
    try {


        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startWith("Bearer")) {
            return res.status(401).json({ error: "No Token Provided" });
        }

        const token = authHeader.split(" ")[1];

        const { payload } = await jwtDecrypt(token, secret);
        req.user = payload;
        next();
    } catch (error) {
        return response.status(403).json({ error: "Invalid or Expired Token" })
    }
}

module.exports = DecodeToken;