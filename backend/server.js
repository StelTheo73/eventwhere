
const { log } = require("console");
const express = require("express");
const path = require("path");
const { exec } = require("child_process");

const app = express();
const PORT = process.env.PORT || 5000;
const PRODUCTION = process.env.PRODUCTION || "FALSE";
const FRONTEND_PATH = "../frontend";
const BUILD_PATH = path.join(__dirname, FRONTEND_PATH, "build");

const buildReactApp = () => new Promise( (resolve, reject) => {
  log("Building app...");
  exec(`npm --prefix ${FRONTEND_PATH} run build`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error building React app: ${error}`);
      reject(error);
    }
    else {
      log("Build completed!");
      resolve();
    }
  });
});

const startServer = async () => {
  await buildReactApp();

  app.listen(PORT, () => {
      log(`Production server is running on http://localhost:${PORT}`);
  });
};

app.use(express.static(BUILD_PATH));

if (PRODUCTION === "TRUE") {
  app.get('/api', (req, res) => {
    res.send('Hello from Express!');
  });
  
  startServer();
}
else if (PRODUCTION === "FALSE") {

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // or specify your frontend's origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  
  app.get('/api', (req, res) => {
    res.send('Hello from Express!');
  });

  app.listen(PORT, () => {
    log(`Production server is running on http://localhost:${PORT}`);
    log(`React development server is running on http://localhost:3000`);
  });
}

// For any other routes, serve the React app
// TODO: This should go in the controllers folder.
app.get('*', (req, res) => {
  res.sendFile(path.join(BUILD_PATH, 'index.html'));
});
