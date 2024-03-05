const express = require('express');
const app = express();
const port = process.env.PORT || 5000;


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // or specify your frontend's origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(port, () => {
  console.log(`Development server is running on http://localhost:${port}`);
});

