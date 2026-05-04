import express from "express";
import mongoose from "mongoose"
import passport from "passport";
import session from "express-session";
import authRoutes from "./routes/authRoutes.js"
import productsRoute from "./routes/productsRoute.js"
import cors from "cors";


mongoose.connect("mongodb://localhost:27017/users-products")
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.log(err.message));


const PORT = 2000;
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

app.use(session({
  secret: "abc@123",
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());


app.use("/", authRoutes);
app.use("/", productsRoute);


app.listen(PORT, () => {
  console.log("server is running on port ", PORT);
})