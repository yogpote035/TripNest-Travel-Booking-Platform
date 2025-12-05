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

app.get("/", (req, res) => {
    res.send("Hello");
})

app.listen(Port, () => {
    console.log("Server is Startted on Port: " + Port);
})