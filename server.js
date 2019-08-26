const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const errorHandler = require('./handlers/error');
const apiRoutes = require('./routes/api');

const app = express()

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))

// routes
app.use('/api/exercise', apiRoutes);

// http://expressjs.com/en/starter/basic-routing.html
app.get("*", function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


// Not found middleware
app.use((req, res, next) => {
  return next({status: 404, message: 'not found'})
})

app.use(errorHandler);

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
