const DB_CONNECTION = 'mongodb+srv://icko:ickocluster0@cluster0.jrp36.mongodb.net/ckuster0?retryWrites=true&w=majority'
const mongoose = require('mongoose');

mongoose.connect(DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', console.log.bind(console, 'DB Connected! '))
 