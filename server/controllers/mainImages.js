const { PrismaClient } = require("@prisma/client");
const prisma = require("../utills/db"); // ✅ Use shared connection
const path = require('path');
const fs = require('fs');

async function uploadMainImage(req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }
  
    // Get file from a request
    const uploadedFile = req.files.uploadedFile;

    // Ensure destination directory exists (create if missing)
    const uploadDir = path.join(__dirname, '..', 'public');
    try {
      fs.mkdirSync(uploadDir, { recursive: true });
    } catch (err) {
      console.error('Failed to create upload directory:', err);
      return res.status(500).json({ message: 'Failed to create upload directory' });
    }

    // Build an absolute destination path to avoid relative path issues
    const destPath = path.join(uploadDir, uploadedFile.name);

    // Using mv method for moving file to the directory on the server
    uploadedFile.mv(destPath, (err) => {
      if (err) {
        console.error('Upload error:', err);
        return res.status(500).json({ message: err.message || 'Upload failed' });
      }
  
      res.status(200).json({ message: "File uploaded successfully", filename: uploadedFile.name });
    });
  }

  module.exports = {
    uploadMainImage
};