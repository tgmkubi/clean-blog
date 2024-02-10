require('dotenv').config();
const express = require('express');
const connectDatabase = require('./helpers/database/connectDatabase');
const Post = require('./models/Post');
const app = express();
const PORT = 3000;

connectDatabase();

// Template Engine
app.set('view engine', 'ejs');

// Express Static Files MIDDLEWARE
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
app.get('/', async (req, res) => {
  let posts;
  try {
    posts = await Post.find();
  } catch (error) {
    console.log(error);
    throw error;
  }

  res.render('index', {
    posts: posts,
  }); // ejs default olarak views klasöründe index isimli ejs dosyasını arar ve render eder.
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add_post', (req, res) => {
  res.render('add_post');
});

app.post('/add_post', async (req, res) => {
  const { title, detail } = req.body;

  // Post Schema ile Post Model oluştur ve kullanıcının girdiği bilgilerden bir adet post dökümanı oluştur ve veri tabanına kaydet.
  try {
    await Post.create({
      title,
      detail,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }

  return res.redirect('/');
});

app.get('/posts/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).send('Post bulunamadı...');
    }
    res.render('post', {
      post,
    });
  } catch (error) {
    return res.status(500).send('Sunucu Hatası');
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
});
