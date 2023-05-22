const express = require('express');

const fileRouter = express.Router()

fileRouter.get('/file/download', (req, res) => {

  const fileID = req.query.id;

  // Logic to fetch the file based on the fileID
  // Replace this with your own file retrieval logic
  // For example, you could use the fs module to read the file from the file system
  const filePath = `path/to/files/${fileID}.txt`;

  res.download(filePath, (err) => {
    if (err) {
      console.error('Error downloading:', err);
      res.status(500).send('Error downloading');
    }
  });
});



module.exports ={
    fileRouter
}