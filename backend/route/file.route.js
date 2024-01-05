require("dotenv").config();
const express = require("express");
const fileRouter = express.Router();
const multer = require('multer');
const jwt = require("jsonwebtoken");

const fs = require('fs');
const path = require('path');

const userModel = require("../model/user.model")
const fileModel = require("../model/file.model");


const secretKey = process.env.secretKey;


// Configure multer for file uploads : Server MEmmory Not the DB
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Set the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        // Generate a unique 6-digit code

        const originalname = file.originalname;
        const extname = path.extname(originalname);
        const uniqueCode = Math.floor(100000 + Math.random() * 900000);
        cb(null, `${uniqueCode}${extname}`);
    },
});

const upload = multer({ storage: storage });


// Middleware to verify JWT token and extract user details
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;
    // console.log("Token ::", token)
    if (!token) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

fileRouter.post("/uploads", authenticateToken, upload.single('file'), async (req, res) => {
    const uniqueCode = req.file.filename;
    const userId = req.user.userID;

    //  Saving the file in the DB 
    const file = new fileModel({
        filename: req.file.originalname,
        userId: userId,
        code: uniqueCode,
    });

    // console.log(file)

    // Save the file information to the database
    await file.save();

    res.status(200).json({msg:'File uploaded successfully!'});

})



// get all files of the User ;
fileRouter.get('/allfiles', authenticateToken, async (req, res) => {
    // Implement logic to retrieve and send the list of files for the user
    const userId = req.user.userID;
    const Files = await fileModel.find({ userId: userId })

    console.log(Files)

    // Retrieve filenames from the MongoDB result
    const filenames = Files.map(file => file.code);

    // Now, you have an array of filenames for the specific user
    // You can use this array to serve files from the "uploads" directory
    const userFiles = filenames.map(filename => ({
        filename,
        url: `/uploads/${filename}`,
    }));

    //  Now get all the files from Multer ;

    res.send(userFiles)

});

//  Now delete files from multer al well 

fileRouter.delete('/files/:filename', authenticateToken, async (req, res) => {
    // Implement logic to retrieve and send the list of files for the user

    const filename = req.params.filename;
    const user = req.user;

    const filePath = path.join(__dirname, '../uploads', filename);

    // Delete the file
    fs.unlink(filePath, async (err) => {
        if (err) {
            console.error(`Error deleting file: ${err.message}`);
            return res.send({ error: "Something went wrong while deleteing the file !!" })
        }
        console.log('File deleted successfully');

        // Delete the file from Db 
        await fileModel.deleteOne({ userId: user.userID, code: filename })
        res.status(200).send({ message: "File has been deleted !" })
    });


});





module.exports = { fileRouter }