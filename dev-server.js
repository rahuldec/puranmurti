const express = require('express');
const entitiesHandler = require('./api/entities');
const feeDataHandler = require('./api/fee-data');
const studentStrengthHandler = require('./api/student-strength');
const admissionHandler = require('./api/admission');

const app = express();

app.get('/api/entities', (req, res) => entitiesHandler(req, res));
app.get('/api/fee-data', (req, res) => feeDataHandler(req, res));
app.get('/api/student-strength', (req, res) => studentStrengthHandler(req, res));
app.get('/api/admission', (req, res) => admissionHandler(req, res));

app.use(express.static(__dirname));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Dev server running at http://localhost:${port}`));
