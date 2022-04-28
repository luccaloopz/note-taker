const notes = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

notes.get('/', (req,res) => {
    res.json(`${req.method} request received to get notes`);

    fs.readFile("./db/db.json", 'utf-8', (err, data) => {
        if(err) {
            console.log(err);
            return;
        } else {
            res.json(JSON.parse(data));
        };
    });
});

notes.post('/', (req,res) => {
    console.info(`${req.method} request received to add a new note`);

    const { title, text } = req.body;

    if(title && text) {
        const newNote = {
            title,
            text,
            note_id: uuidv4(),
        };

        fs.readFile("./db/db.json", "utf-8", (err, data) => {
            if(err) {
                console.log(err);
            } else {
                const parsedNote = JSON.parse(data);
                parsedNote.push(newNote);

                fs.writeFile("./db/db.json", JSON.stringify(newNote, null, 4), (err) => { 
                    err ? console.err(err) : console.log(`New note for ${notesString.title} has been written to the JSON file`)
                });
            };
        });

        const response = {
            status: 'Success',
            body: notesString,
        };

        console.log(response);
        res.json(response);
    } else {
        console.log("Error in posting a new note");
    };
});

module.exports = notes;