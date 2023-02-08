const jwt = require("jsonwebtoken");
const User = require("../schemas/user.schema");

module.exports = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = await req.headers.authorization.split(" ")[1];

    const decode = jwt.verify(token, "ABC", async function (err, decode) {
        if (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await User.findById(decode.id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;

        next();
    });
};
