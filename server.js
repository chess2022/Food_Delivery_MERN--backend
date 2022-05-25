require("dotenv").config()

const { PORT = 3002, DATABASE_URL } = process.env;
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const User = require("./models/customer")
const Payment = require("./models/customer")

const cors = require("cors")
const morgan = require("morgan")

mongoose.connect(DATABASE_URL)

mongoose.connection
    .on("open", () => console.log("MongoDB is connected"))
    .on("close", () => console.log("MongoDB is disconnected"))
    .on("error", (error) => console.log(error))

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors()) 
app.use(morgan("dev"))
app.use(express.json())


app.get("/", (req, res) => {
  res.send("hello world");
});


app.listen(PORT, () => console.log("we are running"));