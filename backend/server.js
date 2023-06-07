const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const multer = require("multer");

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Specify the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Set a unique filename for each uploaded file
  },
});

// Create multer instance
const upload = multer({ storage });

// Use multer middleware to handle file upload

// wants to take image from the user

//connect the databse with the server
const db =
  "mongodb+srv://ankush:Ankush@cluster0.2hfai1x.mongodb.net/testing?retryWrites=true&w=majority";
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log(err));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
});
const UserInfo = new mongoose.model("User", userSchema);

const DeleteUser = new mongoose.model("Delete", userSchema);

app.use(express.json());

app.post("/register", async (req, res) => {
  const searchmail = await User.findOne({ email: req.body.email });
  if (searchmail) {
    res.status(409).json({ message: "user already exist", status: 409 });
  } else {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({ message: "user created" });
      })
      .catch((err) => {
        res.status(500).json({ message: "error occured" });
      });
  }
});

app.post("/login", async (req, res) => {
  console.log("running 1");

  const findUser = await User.findOne({ email: req.body.email });
  console.log("running 3");
  // console.log(findUser.users.password)
  if (findUser) {
    console.log(findUser.password);
    if (findUser.password == req.body.password) {
      res.status(200).json({ message: "login successful" });
    } else {
      res.status(401).json({ message: "password incorrect" });
    }
  } else {
    res.status(404).json({ message: "user not found" });
  }
});
app.use("/uploads", express.static("uploads"));

app.delete("/clients/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const result = await UserInfo.findById(id);
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = new DeleteUser({
      name: result.name,
      email: result.email,
      address: result.address,
      phone: result.phone,
      photo: result.photo,
    });

    await user.save();
    await UserInfo.findByIdAndDelete(id);

    console.log("deleted");
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error occurred" });
  }
});

app.delete("/deletes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const result = await DeleteUser.findById(id);
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = new UserInfo({
      name: result.name,
      email: result.email,
      address: result.address,
      phone: result.phone,
      photo: result.photo,
    });

    await user.save();
    await DeleteUser.findByIdAndDelete(id);

    console.log("deleted");
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error occurred" });
  }
});

app.post("/clients", upload.single("photo"), (req, res) => {
  if (req.file) {
    const { name, email, address, phone } = req.body;
    const photo = req.file.filename;

    const user = new UserInfo({
      name,
      email,
      address,
      phone,
      photo,
    });

    user
      .save()
      .then((result) => {
        res.status(201).json({ message: "user created" });
      })
      .catch((err) => {
        res.status(500).json({ message: "error occurred" });
      });
  } else {
    // No file was uploaded
    res.status(400).json({ error: "No file uploaded" });
  }
});

const rateSchema = new mongoose.Schema({
  distance: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
    rate: {
    type: Number,
    required: false,},
    num:{
        type:Number,
        required:true,
    }
});
const RateInfo = new mongoose.model("Rate", rateSchema);
app.post("/rate", async (req, res) => {
    const {  weight ,distance,num} = req.body;
  
    let rate = 0;
    let w = weight;
    let d = distance;
  
    while (w && d) {
      rate = rate + 10;
      w = w - 1;
      d = d - 1;
    }
  
    if (distance > 10) {
      rate = rate + 100;
    } else if (distance > 50) {
      rate = rate + 500;
    } else if (weight > 10) {
      rate = rate + 50;
    } else {
      rate = rate + 300;
    }
  
    const rateinfo = new RateInfo({
      distance: distance,
      weight: weight,
      rate: rate,
      num:num,
    });
  
    await rateinfo.save();
  
    res.status(200).json({ rate: rate });
  });
  


app.get("/rateinfo", async (req, res) => {
    const rate = await RateInfo.find();
    console.log(rate);
    res.json(rate);
    });

// wants to send client data to the frontend
app.get("/clientsinfo", async (req, res) => {
  const clients = await UserInfo.find();
  console.log(clients);
  res.json(clients);
});

app.get("/deletesinfo", async (req, res) => {
  const clients = await DeleteUser.find();
  console.log(clients);
  res.json(clients);
});

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
