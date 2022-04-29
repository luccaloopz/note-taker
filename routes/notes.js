const notes = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
let dbNotes = require('../db/db.json');

notes.get('/', (req,res) => {
    fs.readFile("./db/db.json", 'utf8', (err, data) => {
        if (err) {
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

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const parsedNote = JSON.parse(data);
                parsedNote.push(newNote);
                dbNotes = parsedNote;
                fs.writeFile("./db/db.json", JSON.stringify(parsedNote, null, 4), (err) => 
                    err ? console.err(err) : console.log(`New note for ${newNote.title} has been written to the JSON file`)
                );
            };
        });

        const response = {
            status: 'Success',
            body: newNote,
        };

        console.log(response);
        res.json(response);
    } else {
        console.log("Error in posting a new note");
    };
});

notes.delete("/:id", (req, res) => {
    let id = req.params.id;

    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let parsedNotes = JSON.parse(data);

            for (let i = 0; i < parsedNotes.length; i++) {
                if (parsedNotes[i].id == id) {
                    parsedNotes.splice(i, 1);
                    fs.writeFile("./db/db.json", JSON.stringify(parsedNotes, null, 4), (err) => 
                        err ? console.err(err) : console.log("Your note has been deleted")
                    );
                };
            };
        };
    });

    res.end();
});

module.exports = notes;