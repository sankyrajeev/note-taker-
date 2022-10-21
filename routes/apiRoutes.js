const router = require("express").Router();
const { application } = require("express");
const uuid = require('../helpers/uuid.js');
const  { readFromFile, writeToFile, readAndAppend } = require("../helpers/fsUtils.js")
const fs = require('fs');

router.get('/notes',(req,res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

router.post('/notes', (req, res) => {
    // Destructuring assignment for the items in req.body
    const { title,text} = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
        id: uuid(),
      };
  
      readAndAppend(newNote, './db/db.json');
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      res.json(response);
    } else {
      res.json('Error in posting Note');
    }
  });


  router.delete('/notes/:id', (req, res) => {
    let db = JSON.parse(fs.readFileSync('db/db.json'))
    // removing note with id
    let deleteNotes = db.filter(newNote => newNote.id !== req.params.id);
    // Rewriting note to db.json
    fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
    res.json(deleteNotes);
});
  
  

  module.exports = router;
  