const mongoose = require('mongoose');
 
const fileSchema = new mongoose.Schema({
  fileName: String,
  filePath: String,
  fileSize: Number,
  fileType: String,
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
