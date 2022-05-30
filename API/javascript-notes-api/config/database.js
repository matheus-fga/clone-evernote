const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/javascriptNotes', {
  useNewURLParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connection successful')).catch((error) => console.log(error));