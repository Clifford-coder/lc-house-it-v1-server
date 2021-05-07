const express = require('express');
const app = express();
const port = 8994;

app.get('/', (req, res) => res.send('Hello world'));

app.listen(port);

console.log(`[app] : http://localhost:${port}`);
