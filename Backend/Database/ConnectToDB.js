const mongoose = require("mongoose");
async function ConnectToDatabase() {
    await mongoose.connect(process.env.DataBase_URL).then(() => {
        console.log("Connected To Database");
    }).catch((err) => {
        console.log("Error In Connecting to Database: ", err);
    })
}
module.exports = ConnectToDatabase;