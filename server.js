require("dotenv").config()

const { PORT = 3002, DATABASE_URL } = process.env;
const express = require("express")
const app = express()
const bcrypt = require("bcrypt");
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
  // // capture password and hash it
  // req.body.password = await bcrypt.hash(
  //   req.body.password,
  //   await bcrypt.genSalt(10)
  // );

  // create the user in the DB
  try {
    res.json(await User.create(req.body));
  } catch (error) {
    res.status(400).json(error);
  }
});

// log in page route - GET
app.get("/login", async (req, res) => {
  try {
        res.json(await User.find({}));
      } catch (error) {
        res.status(400).json(error);
      };
});

// login send user data to server - POST
// app.post("/login", (req, res) => {
  // look the user up by username in DB
  // const { username, password } = req.body;
  // User.findOne( username, async (err, user) => {
    // if user doesn't exist send error message
    // if (err || !user) return res.send("User does not exist"); //can also render an ejs page that says cannot find that account & redirects to proper page
    // compare password
    // const passwordMatches = await bcrypt.compare(password, user.password); //first comes from frontend and second from DB
    // or if it does not match redirect to login - error message
    // if (!passwordMatches) return res.send("Incorrect password"); //or res.render a page and redirects to login
    // save login status in session/create session
    // req.session.loggedIn = true;
    // req.session.username = username;
    // redirect to restaurants to see options
//     res.redirect("/restaurants");
//   });
// });

// end session (logout) uses express session route to delete that session ID and redirect back home
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/login");
  });
});

// USER DASHBOARD
app.get("/user", async (req, res) => {
      try {
        res.json(await User.find({}))
      } catch (error) {
        res.status(400).json(error);
      }
})


// USER DELETE ACCOUNT ROUTE
app.delete("/user/:id", async (req, res) => {
    try {
        // send all users
        res.json(await User.findByIdAndDelete(req.params.id))
    } catch (error) {
        //send error
        res.status(400).json(error)
    }
})

// USER UPDATE ROUTE
app.put("/user/:id", async (req, res) => {
    try {
        // send all users
        res.json(
        await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
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