require('dotenv').config()
const multer = require('multer');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (_, res) => res.sendFile(process.cwd() + '/views/index.html'));

app.post('/api/fileanalyse', multer().single('upfile'), (req, res) => {
  try {
    res.json({ 
      name: req.file.originalname, 
      type: req.file.mimetype, 
      size: req.file.size 
    });
  } catch(err) {
    res.json({ Error: err });
  }
});

app.listen(process.env.PORT || 3000, () => console.log('Your app is listening on port ' + process.env.PORT));