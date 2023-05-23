const express = require("express");
const app = express();
const path = require("path");
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Files');
    },
    filename: (req, file, cb) => {
        const fileId = generateFileId(); 
        const fileName = fileId + '_' + Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    }
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "upload.html"));
});

app.post("/upload", upload.single("image"), (req, res) => {
    console.log(req.file);
    const fileId = generateFileId();
    res.send("Image uploaded with fileId: " + fileId);
});

app.post("/Multi", upload.array("images", 3), (req, res) => {
    console.log(req.files);
    const fileId = generateFileId();
    res.send("Images uploaded with fileId: " + fileId);
});

function generateFileId() {
    return Math.random().toString(36).substring(2, 15);
}

app.get('/file/download', (req, res) => {
    const fileID = req.query.id; 
    if (!fileID) {
        res.status(400).send('Missing fileID');
        return;
    }

    const filePath = path.join(__dirname, 'Files', fileID); 

  
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.status(404).send('File not found');
        } else {
            res.download(filePath, (err) => {
                if (err) {
                    console.error('Error while downloading file:', err);
                } else {
                    console.log('File downloaded successfully');
                }
            });
        }
    });
});

app.listen(8080, () => {
    console.log("8080 is now working");
});