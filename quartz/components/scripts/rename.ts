const fs = require('fs');
const path = require('path');

// Define the path to your build directory
const buildPath = path.join(__dirname, 'your-build-folder'); // Replace 'your-build-folder' with the actual name of your build directory

// Define the old and new file paths
const oldFilePath = path.join(buildPath, 'brevo-frame');
const newFilePath = path.join(buildPath, 'brevo-frame.html');

// Rename the file
fs.rename(oldFilePath, newFilePath, (err: NodeJS.ErrnoException | null) => {
  if (err) {
    console.error('Error renaming file:', err);
    return;
  }
  console.log('Successfully renamed the file.');
});
