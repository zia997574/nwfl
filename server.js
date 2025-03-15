const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');  // For handling cross-origin requests

const app = express();
const port = 5600;  // Change port to 5600

// Enable CORS for testing
app.use(cors());

// Middleware to parse JSON body with 10MB limit
app.use(bodyParser.json({ limit: '10mb' }));

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  console.log('Creating uploads folder...');
  fs.mkdirSync(uploadsDir, { recursive: true }); // Create directory if it doesn't exist
} else {
  console.log('Uploads folder already exists.');
}

// Route to handle image upload
app.post('/upload', (req, res) => {
  const imageDataUrl = req.body.image;

  if (imageDataUrl) {
    console.log('Image data received:', imageDataUrl.slice(0, 100));  // Log first 100 chars of image data for debugging

    // Clean the Base64 string (remove the data URL scheme)
    const base64Data = imageDataUrl.replace(/^data:image\/png;base64,/, '');
    const imagePath = path.join(uploadsDir, `captured_image_${Date.now()}.png`);

    // Write the Base64 data to the file system
    fs.writeFile(imagePath, base64Data, 'base64', (err) => {
      if (err) {
        console.error('Error saving image:', err);
        return res.status(500).json({ success: false, message: 'Failed to save image' });
      }

      console.log('Image saved successfully to', imagePath);
      res.status(200).json({ success: true, message: 'Image uploaded successfully!', filePath: imagePath });
    });
  } else {
    console.error('No image data received');
    res.status(400).json({ success: false, message: 'No image data provided' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
