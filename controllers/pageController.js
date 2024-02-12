const Post = require('../models/Post');

exports.getAboutPage = (req, res) => {
  res.render('about');
};

exports.getAddPostPage = (req, res) => {
  res.render('add_post');
};

exports.editPostPage = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).send('Post bulunamadı...');
    }
    res.render('edit_post', {
      post,
    });
  } catch (error) {
    return res.status(500).send('Sunucu Hatası');
  }
};
