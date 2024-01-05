const express = require("express");
const bodyParser = require("body-parser")
const path = require('path');


const { connection } = require("./db");

const { userRouter } = require("./route/user.route");


const app = express();
require("dotenv").config()
const cors = require("cors");
const { fileRouter } = require("./route/file.route");
app.use(cors())

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/", fileRouter);

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const port = process.env.port || 3001
app.listen(port, async () => {
    await connection
    console.log("connected to db")
    console.log(`server is listening to ${port}`)
})
