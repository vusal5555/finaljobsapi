const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    throw new CustomAPIError("Please provide email and password", 400);
  }

  const id = new Date().getDate();

  const token = jwt.sign({ id, userName }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("No token provided", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const lucky = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `Hello ${decoded.userName}`,
      secret: `Here is your authorized data your lucky number is ${lucky}`,
    });
  } catch (error) {
    throw new CustomAPIError("No authorized to access this route", 401);
  }
};

module.exports = { login, dashboard };
