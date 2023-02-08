const User = require("../schemas/user.schema");
const bcrypt = require("bcrypt");
const joi = require("joi");
const jwt = require("jsonwebtoken");

const registerSchema = joi.object().keys({
    name: joi.string().min(3).max(20).required(),
    email: joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "in"] } }),
    password: joi.string().required(),
});

exports.register = async (req, res) => {
    const { error, value } = registerSchema.validate(req.body, {
        abortEarly: false,
    });
    if (error) {
        return res.send(error.details);
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.send({ message: "user is already register" });
    }

    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(req.body.password, salt);

    const data = await User.create(req.body);
    res.send({ message: "user added", data });
};

const loginSchema = joi.object().keys({
    email: joi
        .string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "in"] },
        })
        .required(),
    password: joi.string().required(),
});
exports.login = async (req, res) => {
    const { error, value } = await loginSchema.validate(req.body, {
        abortEarly: false,
    });
    if (error) {
        return res.status(422).send(error.details);
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(422).json("email is invalid");
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(422).json("password is invalid");
    }

    var token = jwt.sign({ id: user.id }, "ABC");
    user._doc.token = token;
    res.send(user);
};
