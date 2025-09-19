const bcrypt = require("bcrypt");
const crypto = require("crypto");
const Auth = require("../models/auth"); // ✅ your schema is called auth
const Blog = require("../models/blog");

// GET login form
const login_get = (req, res) => {
  res.render("login", { title: "Login", error: null });
};

// GET signup form
const signup_get = (req, res) => {
  res.render("signup", { title: "Sign Up", error: null });
};

// POST signup
const signup_post = async (req, res) => {
  try {
    const { username, password } = req.body;

    // check if user exists
    const existingUser = await Auth.findOne({ name: username });
    if (existingUser) {
      return res.render("signup", {
        title: "Sign Up",
        error: "User already exists. Please choose a different username.",
      });
    }

    // hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // create new user
    const newUser = new Auth({
      name: username,
      password: hashedPassword,
    });

    await newUser.save();
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.render("signup", {
      title: "Sign Up",
      error: "Error creating user. Please try again.",
    });
  }
};

// POST login
const login_post = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Auth.findOne({ name: username });
    if (!user) {
      return res.render("login", {
        title: "Login",
        error: "User not found. Please sign up first.",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.render("login", {
        title: "Login",
        error: "Wrong password. Please try again.",
      });
    }

    // ✅ Session handling
    req.session.userId = user._id;

    // ✅ Generate hash code for session token
    const sessionToken = crypto.randomBytes(16).toString("hex");
    req.session.hash = sessionToken;

    // Load admin blogs after login
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return res.render("admin", { title: "Admin", blogs, error: null });
  } catch (err) {
    console.error(err);
    return res.render("login", {
      title: "Login",
      error: "Something went wrong. Please try again.",
    });
  }
};

// GET logout
const logout_get = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.render("login", {
        title: "Login",
        error: "Error logging out. Please try again.",
      });
    }
    res.redirect("/login");
  });
};

module.exports = {
  login_get,
  login_post,
  signup_get,
  signup_post,
  logout_get,
};
