const express = require("express");
const USER = require("./MOCK_DATA (1).json");
const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.listen(PORT, () => {
  console.log(`Your app is working on localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("You're on HomePage");
});

app.get("/User", (req, res) => {
  return res.json(USER);
});

app.get("/api/User", (req, res) => {
  const html = `
    <ul>
      ${USER.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
  `;
  return res.send(html);
});

app.post("/api/User", (req, res) => {
  const newUser = req.body;
  console.log("Received new user:", newUser);

  // Determine the maximum id in the USER array
  const maxId = USER.reduce((max, user) => (user.id > max ? user.id : max), 0);

  // Increment the id by 1 for the new user
  newUser.id = maxId + 1;

  // Add new user to the USER array
  USER.push(newUser);

  return res.json({ status: "Pending", body: newUser });
});
app.get("/User/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = USER.find((user) => user.id === id);

  if (user) {
    return res.json(user);
  } else {
    return res.status(404).json({ message: "User not found" });
  }
});

app.route("/User/:id").get((req, res) => {
  const id = Number(req.params.id);
  const user = USER.find((user) => user.id === id);

  if (user) {
    return res.json(user);
  } else {
    return res.status(404).json({ message: "User not found" });
  }
});
