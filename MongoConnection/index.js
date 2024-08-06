const express = require("express");
const Mongo = require("mongoose");
const bodyParser = require("body-parser"); // Import body-parser to parse JSON bodies

const PORT = 8000;
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

Mongo.connect("mongodb://127.0.0.1:27017/Login")
  .then(() => {
    console.log("MongoConnected");
  })
  .catch((error) => {
    console.log("Error:", error);
  });

const userSchema = new Mongo.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
  },
  MobileNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  EmailID: {
    type: String,
    required: true,
    unique: true,
  },
});

const user = Mongo.model("user", userSchema);

app.listen(PORT, () => {
  console.log(`Your Application Running on ${PORT} PORT`);
});

app.post("/api/user", (req, res) => {
  // Corrected the order here
  const body = req.body;
  console.log("Request Body:", body);
  if (!body.EmailID || !body.FirstName || !body.MobileNumber) {
    // Corrected logical OR operator
    return res.status(401).send({ msg: "All Param Required" });
  }
  user
    .create({
      FirstName: body.FirstName,
      LastName: body.LastName,
      EmailID: body.EmailID,
      MobileNumber: body.MobileNumber,
    })
    .then((result) => {
      console.log(result);
      return res.status(201).json({ msg: "Successfully Created" });
    })
    .catch((error) => {
      console.error("Error creating user:", error);
      return res.status(500).json({ msg: "Error creating user" });
    });
});

app.get("/api/users/:id", async (req, res) => {
  try {
    const userId = req.params.id; // Accessing the id from req.params
    console.log(`Fetching user with ID: ${userId}`); // Log the user ID

    const user = await user.findById(userId); // Using the id to find the user

    if (!user) {
      console.log("User not found");
      return res.status(404).send({ msg: "User not found" });
    }

    console.log("User found:", user);
    return res.status(200).send(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).send({ msg: "Error fetching user" });
  }
});
