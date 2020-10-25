const express = require('express');
const app = express();
const api = require('./routes');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use('/api', api);

const port = 3002;
app.listen(port, () => console.log(`Listening on port ${port}`));