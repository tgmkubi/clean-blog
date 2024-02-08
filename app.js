const express = require('express');
const app = express();
const PORT = 3000;

// Template Engine
app.set('view engine', 'ejs');

// Express Static Files MIDDLEWARE
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.get('/', (req, res) => {
  res.render('index'); // ejs default olarak views klasöründe index isimli ejs dosyasını arar ve render eder.
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add_post', (req, res) => {
  res.render("add_post");
});

app.get('/post', (req, res) => {
  res.render("post");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
});
