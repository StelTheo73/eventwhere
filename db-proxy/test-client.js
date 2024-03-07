const express = require('express');
const axios = require('axios');
const https = require('https');
const fs = require('fs');

const app = express();

console.log(__dirname);

// Load SSL certificate and private key for Python server
const pythonServerOptions = {
    cert: fs.readFileSync('./src/server.pem'), // Replace with actual path to Python server's certificate
    key: fs.readFileSync('./src/server.key')   // Replace with actual path to Python server's private key
};

// Define Python server URL and credentials
const pythonServerUrl = 'https://localhost:8000'; // Replace with actual URL of Python server
const username = 'your_username';
const password = 'your_password';

// Define the endpoint you want to access on the Python server
const endpoint = '/protected';

// Configure HTTPS agent with Python server's SSL options
const httpsAgent = new https.Agent({
    ...pythonServerOptions,
    rejectUnauthorized: false // Disable SSL certificate validation (for self-signed certificates)
});

// Route to authenticate against the Python server
app.get('/authenticate', async (req, res) => {
    try {
        // Encode username and password for Basic Authentication
        const credentials = Buffer.from(`${username}:${password}`).toString('base64');

        // Send GET request to Python server with Basic Authentication headers
        const response = await axios.get(`${pythonServerUrl}${endpoint}`, {
            httpsAgent: httpsAgent,
            headers: {
                'Authorization': `Basic ${credentials}`
            }
        });

        // If authentication is successful, return response from Python server
        res.status(response.status).send(response.data);
    } catch (error) {
        // If authentication fails or any other error occurs, return error message
        res.status(error.response.status).send(error.response.data);
    }
});

// Start the Express server
app.listen(3000, () => {
    console.log('Express server running on port 3000');
});