//required packages
const express= require('express');
const fs= require ('fs');
const path= require ('path');
const { v4: uuidv4 } = require('uuid');

const PORT= process.env.PORT || 3000;
const app= express();

//middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//GET route for index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

//GET route for notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});

//GET route for api/notes
app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/db/db.json'))
});

//POST notes to api/notes
app.post('/api/notes', (req, res) => {
  //log that a POST request was received
  //destructure assignment for the items in req.body
  const { title, text} = req.body;
  console.info(req.body);
  
  fs.readFile('./db/db.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
    }
    const note= JSON.parse(data)
    const newNote= {
      title,
      text,
      id: uuidv4(),
    }
    note.push(newNote)
    console.log(note)
    fs.writeFile('./db/db.json', JSON.stringify(note), err => console.log(err))
  })
  res.json ({ok:true})
});

//DELETE notes should be nearly identical to POST
app.delete('/api/notes/:id', (req, res) => {
  const uniqueID = req.params.id;
  fs.readFile('./db/db.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
    } 
    const note= JSON.parse(data)
    const filterNote= note.filter(function(note) {
      return note.id !== uniqueID
    })
    fs.writeFile('./db/db.json', JSON.stringify(filterNote), err => console.log(err))
  })
  res.json({ok:true})
})

app.listen(PORT, () => 
  console.log(`listenin' on http://localhost:${PORT} 🔥`)
);