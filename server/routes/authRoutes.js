import express from "express"
import bcrypt from "bcryptjs"
import User from "../models/user.js"
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";


const router = express.Router();




router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(404).json({ message: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword
    })
    await user.save();
    return res.status(201).json(user);

  } catch (err) {
    res.status(500).json({ "message": err.message })
  }

});

// Local strategy 

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username });

      if (!user) {
        return done(null, false, { message: "User not found" })
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return done(null, false, { message: "wrong passowrd" });
      }

      done(null, user);

    } catch (err) {
      return done(err);
    }
  }

));

// Serialize the user
passport.serializeUser((user, done) => {
  done(null, user._id);
})

// Deserialize the user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (user) {
      return done(null, user);
    }
  }
  catch (err) {
    done(err)
  }
})
// authentication midleware

function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  else {
    return re.status(401).json({ message: "Not Recognized." })
  }

}
router.post("/login",
  passport.authenticate("local", {
    successRedirect: "/products",
    failureRedirect: "/login"
  })
);

// protucted route

{/**

  router.get("/products", isAuth, (req, res) => {
  res.send("Wellcome you are authenticated");
})
*/}


export default router;
