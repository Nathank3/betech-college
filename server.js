const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 8001;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));

// Serve static files
app.use('/static', express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    try {
        const coursesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'courses.json'), 'utf8'));
        res.render('index', { categories: coursesData });
    } catch (error) {
        console.error("Error loading courses data:", error);
        res.render('index', { categories: {} });
    }
});

app.listen(port, () => {
    console.log(`Betech landing page running at http://localhost:${port}`);
});
