const File = require('../models/FileSchema');

const uploadController = {
  uploadFile: async (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    try {
      // Create a new file document in MongoDB
      const newFile = new File({
        fileName: req.file.originalname,
        filePath: `http://localhost:4000/uploads/${req.file.filename}`,
        fileSize: req.file.size,
        fileType: req.file.mimetype,
      });

      // Save the file details to the database
      await newFile.save();

      res.json({ success: true, message: 'File uploaded successfully.', file: newFile });
    } catch (err) {
      console.error('Error saving file to database:', err);
      res.status(500).json({ success: false, error: 'Error saving file to database.' });
    }
  },
};

module.exports = uploadController;
