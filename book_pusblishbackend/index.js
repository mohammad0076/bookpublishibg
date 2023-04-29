const express = require('express');
const { default: mongoose } = require('mongoose');

const dotenv = require("dotenv");

dotenv.config();
const port = 5000 || process.env.PORT
const app = express();
app.use(express.json());

var cors = require('cors')


app.use(cors())
const URI = 'mongodb://localhost:27017/crud2';
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connected to database')
}).catch((err) => {
    console.error('error connecting to the database', err)

})

const booklist = require('./booklist/booklist')


app.listen(port, () => {
    console.log('listen', { port })
})
app.use('/booklist', booklist) 