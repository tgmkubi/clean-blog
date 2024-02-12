const Post = require('../models/Post');

exports.addPost = async (req, res) => {
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
};

exports.editPost = async (req, res) => {
  const { id } = req.params;
  const { title, detail } = req.body;

  let post;
  try {
    post = await Post.findById(id);
    if (!post) {
      return res.status(404).send('Post bulunamadı...');
    }

    post.title = title;
    post.detail = detail;
    post = await post.save();

    res.render('post', {
      post,
    });
  } catch (error) {
    return res.status(500).send('Sunucu Hatası');
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).send('Post bulunamadı...');
    }

    return res.status(200).redirect('/');
  } catch (error) {
    return res.status(500).send('Sunucu Hatası');
  }
};

exports.getAllPosts = async (req, res) => {
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
};

exports.getSinglePost = async (req, res) => {
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
};
