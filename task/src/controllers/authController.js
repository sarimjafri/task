import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export async function SignupController(res, req) {
  const { username, password, email } = req.body;
  try {
    if (!username || !password || !email) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "The user already exists" });
    }
    const token = jwt.sign(
      {
        userId: User._id,
        email: User.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    const hashing = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, hashing);

    const NewUser = create({
      username,
      email,
      password: hashedPass,
    });
    await NewUser.save()
    res.status(200).json({ message: "User created successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Internal server error"})
  }
}

export async function LoginController(res, req) {
  const { password, email } = req.body;
  try {
    if ( !password || !email) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "The user doesnot exist" });
    }
    const token = req.body.token;

    if (token) {
      const decoded =  jwt.verify(token, process.env.JWT_SECRET)     
    }
    
    res.status(200).json({ message: "User Logged in successfully", decoded });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}





