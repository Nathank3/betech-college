const express = require('express');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');
const compression = require('compression');
const app = express();
const port = process.env.PORT || 8001;

// Security & Performance Middleware
app.use(helmet({
    contentSecurityPolicy: false, // Disabled to allow external fonts/scripts without complex configuration
    crossOriginEmbedderPolicy: false
}));
app.use(compression());
app.disable('x-powered-by');

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));

// Serve static files with caching (1 day)
const cacheOptions = {
    maxAge: '1d',
    etag: true
};
app.use('/static', express.static(path.join(__dirname, 'static'), cacheOptions));

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
