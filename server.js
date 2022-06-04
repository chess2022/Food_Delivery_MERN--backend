require("dotenv").config()

const { PORT = 3002, DATABASE_URL } = process.env;
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const User = require("./models/customer")
const Payment = require("./models/customer")
const Restaurant = require("./models/restaurants")
const MenuItem = require("./models/restaurants");
const Order = require("./models/orders")
const Driver = require("./models/delivery")

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



// CRUD ROUTES index delete create update show
// Need: login, restaurants, single restaurant with menu items, cart, status(delivery details), ...
//////////////////////////////////////
// LOGIN ROUTES
//////////////////////////////////////

// signup page - GET
app.get("/signup", async (req, res) => {
  try {
        res.json(await User.find({}));
      } catch (error) {
        res.status(400).json(error);
      };
});

// signup send user data to server and stores in DB - POST
app.post("/signup", async (req, res) => {
  // create the user in the DB
  try {
    res.json(await User.create(req.body));
  } catch (error) {
    res.status(400).json(error);
  }
    res.redirect("/success")
});


// success page after signup to link to login
app.get("/success", (req, res) => {
  console.log("Success!")
})

// log in page route - GET
app.get("/login", async (req, res) => {
  try {
        res.json(await User.find({}));
      } catch (error) {
        res.status(400).json(error);
      };
        res.redirect("/restaurants");

});

// ORDERS INDEX
app.get("/order", async (req, res) => {
  try {
    res.json(await Order.find({}))
  } catch (error) {
    res.status(400).json(error)
  }
})

// ORDER SHOW
app.get("/order/:id", async (req, res) => {
  try {
    res.json(await Order.find(req.params.id));
  } catch (error) {
    res.status(400).json(error);
  }
})


// ORDER DELETE ROUTE
app.delete("/order/:id", async (req, res) => {
    try {
        // send all users
        res.json(await Order.findByIdAndDelete(req.params.id))
    } catch (error) {
        //send error
        res.status(400).json(error)
    }
})

// ORDER UPDATE ROUTE
app.put("/order/:id", async (req, res) => {
    try {
        // send all users
        res.json(
        await Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
        )
    } catch (error) {
        //send error
        res.status(400).json(error)
    }
})


app.get("/", async (req, res) => {
  try {
    res.json(await User.find({}));
  } catch (error) {
    res.status(400).json(error);
  }
});

// rest of the routes
app.get("/restaurants", async (req, res) => {
      try {
        res.json(await Restaurant.find({}));
      } catch (error) {
        res.status(400).json(error);
  } 
}) 

app.post("/restaurants", async (req, res) => {
    try {
        res.json(await Restaurant.create(req.body))
    } catch (error) {
        res.status(400).json(error)
    }
})

app.get("/restaurants/:id", async (req, res) => {
        try {
            res.json(await MenuItem.find(req.params.id.menuItem))
        } catch (error) {
            res.status(400).json(error)
    }
})


app.listen(PORT, () => console.log("we are running"));