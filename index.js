const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const catRoute = require("./routes/categories");

const multer = require("multer");

//CONFIG ENV
dotenv.config();

//USING EXPRESS
app.use(express.json());

//CONNECTING MONGODB
mongoose.connect(process.env.MONGO_URL)
    .then(console.log("Connect to MongoDB"))
    .catch((err) => {
        console.log(err);
    })

//HANDLE STORAGE WITH MULTER
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
});
const upload = multer({ storage: storage });

//ROUTES FOR UPLOAD IMAGE
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded !")
})

//USING ROUTE
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", catRoute);


//TEST ON BROWSER
// app.use("/", (req, res)=>{
//     console.log("Hey I'm here");
// })

//DEFINE PORT
app.listen("5000", () => {
    console.log("Backend is running");
})