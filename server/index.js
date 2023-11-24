const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// databse
const dbConnection = require("./config/database");
// routes
const userRoute = require("./routes/userRoute");
const chatRoute = require("./routes/chatRoute");
const messageRoute = require("./routes/messageRoute");

const app = express();
// configuration
dotenv.config({ path: ".env" });
dbConnection();
app.use(express.json());
app.use(cors());
app.use("/api/v1/users", userRoute);
app.use("/api/v1/chats", chatRoute);
app.use("/api/v1/messages", messageRoute);

const port = process.env.PORT || 3000;

app.listen(port, (req, res) => {
  console.log("server is listening on port " + port);
});
