const express = require('express');
const path = require('path');
const app = express();


app.use('/journey',express.static(path.join(__dirname, '/journey-tracker/build')));
app.use('/sessions',express.static(path.join(__dirname, '/session-tracker/build')));
app.use('/login',express.static(path.join(__dirname, '/login/build')));
app.use('/register',express.static(path.join(__dirname, '/login/build')));
app.use('/',express.static(path.join(__dirname, '/login/build')));

app.get('/sessions/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/session-tracker/build', 'index.html'));
});



app.listen(3002, () => {
  console.log('Listening on port 3002')
});