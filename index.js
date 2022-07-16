const router = require('./routes/apiRoutes');
const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.use('/api', router);

// api/notes
// GET all notes
// These are view routes.  Types of routes that the viewer sees in the browser.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});

// api/notes
// POST single note

// api/notes/:id
// DELETE

app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}.`);
});