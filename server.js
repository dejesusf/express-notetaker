//required packages
const express= require('express');
const fs= require ('fs');


const PORT= process.env.PORT || 3000;

const app= express();

//middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api)
app.use(express.static('public'));

//GET route for notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'))
});

//GET route for index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
});

//GET route for api/notes
app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'db/db.json'))
});

//POST notes to api/notes
app.post('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
    }
    
  })
})

app.listen(PORT, () => {
  console.log(`listenin' on http://localhost:${PORT} ❤️‍🔥`)
})