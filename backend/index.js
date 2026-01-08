const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;

const { connectDB } = require("./database/db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

/* ================= CLOUDINARY ================= */
cloudinary.config({
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_api,
  api_secret: process.env.cloudinary_secret,
});

/* ================= MIDDLEWARE ================= */

// CORS (Vite frontend)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Cookies
app.use(cookieParser());

// JSON & URL encoded (NO body-parser)
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true }));

/* ================= ROUTES ================= */

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messagesRoutes");

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

/* ================= START SERVER ================= */

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectDB();
});
