const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

const inflationData = require('./data.json');

app.use(cors());

app.get('/api/inflation/:year/:product', (req, res) => {
    const { year, product } = req.params;
    const yearData = inflationData[year];
    if (yearData && yearData[product]) {
        res.json({ [product]: yearData[product] });
    } else {
        res.status(404).json({ error: 'Data not found for given year and product.' });
    }
});

app.get('/', (req, res) => {
    res.send('Inflation Tracker Backend is Running.');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});