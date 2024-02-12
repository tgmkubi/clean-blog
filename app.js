require('dotenv').config();
const express = require('express');
var methodOverride = require('method-override');
const connectDatabase = require('./helpers/database/connectDatabase');
const Post = require('./models/Post');
const {
  getAboutPage,
  getAddPostPage,
  editPostPage,
} = require('./controllers/pageController');
const {
  addPost,
  editPost,
  deletePost,
  getAllPosts,
  getSinglePost,
} = require('./controllers/postController');
const PORT = 3000;

const app = express();

connectDatabase();

// Template Engine
app.set('view engine', 'ejs');

// Express Static Files MIDDLEWARE
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method', { methods: ['GET', 'POST'] }));

// ROUTES
app.get('/about', getAboutPage);
app.get('/add_post', getAddPostPage);
app.get('/posts/edit/:id', editPostPage);

app.post('/add_post', addPost);
app.get('/', getAllPosts);
app.get('/posts/:id', getSinglePost);
app.put('/posts/edit/:id', editPost);
app.delete('/posts/delete/:id', deletePost);

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
});
