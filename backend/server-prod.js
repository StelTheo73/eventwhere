const express = require('express');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const port = process.env.PORT || 5000;

const frontendPath = "../frontend";


const buildReactApp = () => new Promise( (resolve, reject) => {
  exec(`npm --prefix ${frontendPath} run build`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error building React app: ${error}`);
      reject(error);
    }
    else resolve();
  });
});

const startServer = async () => {
  await buildReactApp();

  app.listen(port, () => {
      console.log(`Production server is running on http://localhost:${port}`);
  });
};



const buildPath = path.join(__dirname, frontendPath, 'build');

app.use(express.static(buildPath));

// For any other routes, serve the React app
// TODO: This should go in the controllers folder.
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});


startServer();

