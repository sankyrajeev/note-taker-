const router = require("express").Router();
const { application } = require("express");
const uuid = require('../helpers/uuid.js');
const  { readFromFile, writeToFile, readAndAppend } = require("../helpers/fsUtils.js")


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
    readFromFile('./db/db.json').then((data) => {
        let curData = JSON.parse(data);

        let newData = curData.filter((note) => note.id !== req.params.id);
        console.log(newData);
        writeToFile('./db/db.json', newData);
    });
});
  
  

  module.exports = router;
  