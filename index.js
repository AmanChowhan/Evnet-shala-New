const express = require("express");
const axios = require("axios");
const auth = require("./authMiddleware");

const app = express();
app.use(express.json());

app.post("/login", (req, res) =>
  axios.post("http://auth:3004/login", req.body).then(r => res.send(r.data))
);

app.post("/book", auth, async (req, res) => {
  const r = await axios.post("http://booking:3001/book", {
    user: req.user.email
  });
  res.send(r.data);
});

app.listen(3000, () => console.log("API Gateway running"));
