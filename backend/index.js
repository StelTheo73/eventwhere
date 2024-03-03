const { log } = require('console');
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3002;
const production = process.env.PRODUCTION || "FALSE";

if (production === "TRUE") {
    const buildPath = path.join(__dirname, '..', 'frontend', 'build');
    app.use(express.static(buildPath));
    log(buildPath);

    app.get('/', (req, res) => {
        res.sendFile(path.join(buildPath, 'index.html'));
    });

    app.get('/user', (req, res) => {
        res.sendFile(path.join(buildPath, 'index.html'));
    });
}

app.listen(port, () => {
    log(`Server is up and running on port ${port}`);
});
