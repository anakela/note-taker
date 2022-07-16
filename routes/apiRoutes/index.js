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
    console.log(req.params.id);
    readFile('./db/db.json', 'utf-8')
        .then((response) => {
            let data = JSON.parse(response);
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