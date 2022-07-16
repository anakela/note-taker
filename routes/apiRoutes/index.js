const fs = require('fs');
const router = require('express').Router();
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const { v4: uuidv4 } = require('uuid');

router.get('/notes', (req, res) => {
    readFile('./db/db.json', 'utf-8')
        .then((response) => {
            let data = JSON.parse(response);
            // console.log(data);
            res.json(data);
        });
});

router.post('/notes', (req, res) => {
    console.log(req.body);
    const noteObj = {
        // Here, each ID is generated automatically by uuid.
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text
    };
    readFile('./db/db.json', 'utf-8')
        .then((response) => {
            let data = JSON.parse(response);
            // console.log(data);
            // res.json(data);
            data.push(noteObj);

            writeFile('./db/db.json', JSON.stringify(data))
                .then((result) => {
                    console.log(result);
                    res.json(data);
                });
        });

});

router.delete('/notes/:id', (req, res) => {
    // Here, use each node's ID to determine which should be deleted.
    console.log(req.params.id);
    readFile('./db/db.json', 'utf-8')
        .then((response) => {
            let data = JSON.parse(response);
            // Filter out all note IDs that don't match the ID that the user selected.
            const filteredNotes = data.filter(note => note.id !== req.params.id);
            console.log(filteredNotes);

            writeFile('./db/db.json', JSON.stringify(filteredNotes))
                .then((result) => {
                    console.log(result);
                    res.json(filteredNotes);
                });
        });
});

module.exports = router;