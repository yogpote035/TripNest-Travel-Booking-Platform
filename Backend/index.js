const express = require("express");
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const app = express();
const Port = process.env.PORT || 5000;
const cors = require("cors");
const ConnectToDatabase = require("./Database/ConnectToDB");
ConnectToDatabase();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Welcome on TripNest Check Route");
})

app.use("/api/auth", require("./Routes/AuthenticationRoutes/AuthenticationRoutes"))
app.listen(Port, () => {
    console.log("Server is Started on Port: " + Port);
})