const express = require('express');
const app = express();
const PORT = 3000;

// Static Files
const path = require('path');
app.use('/static', express.static(path.join(__dirname, 'temp')));

app.get('/', (req, res) => {
  const blog = { id: 1, title: 'Blog title', description: 'Blog description' };
  res.status(200).send(blog);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
});
