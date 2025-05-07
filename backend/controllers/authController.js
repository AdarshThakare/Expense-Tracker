const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//Register User
exports.registerUser = async (req, res) => {
  const { fullName, email, password, profileImageUrl } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already in use." });
    }

    //Create user in the db
    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error registering the user", error: err.message });
  }
};

//Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      // UNDER THE HOOD STUFF
      // UserSchema.method.comparePassword = async function (candidatePassword) {
      //   return await bcrypt.compare(candidatePassword, this.password);
      // };

      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error logining the user", error: err.message });
  }
};

//Register User
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User Not Found!" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      msg: "Error fetching the registered user",
      error: err.message,
    });
  }
};
