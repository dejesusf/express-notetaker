//required packages
const express= require('express');
const fs= require ('fs');
const path= require ('path');

const PORT= process.env.PORT || 3000;
const app= express();

//middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('/public'));

//GET route for index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'develop/public/index.html'))
});

//GET route for notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'develop/public/notes.html'))
});

//GET route for api/notes
app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'develop/db/db.json'))
});

//POST notes to api/notes
app.post('/api/notes', (req, res) => {
  //log that a POST request was received
  //destructure assignment for the items in req.body
  const { title, text } = req.body;
  console.info(req.body);
  
  fs.readFile('/develop/db/db.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
    }
    const note= JSON.parse(data)
    const newNote= {
      title,
      text,
      id: note.length++,
    }
    note.push(newNote)
    console.log(note)
    fs.writeFile('/develop.db/db.json', JSON.stringify(notes), err => console.log(err))
  })
  res.json ({ok:true})
});

app.listen(PORT, () => 
  console.log(`listenin' on http://localhost:${PORT} 🔥`)
);