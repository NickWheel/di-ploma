const express = require('express');
const mongoose = require('mongoose');
const Ajv = require('ajv');
const MessageModel = require('./models/messageModel');
const messageSchema = require('./schemas/messageSchema');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// DB connection
mongoose.connect('mongodb+srv://admin:1111@cluster0-7cnbh.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once('open', (err) => {
  if (err) throw err;
  console.log('Connected to db!');
});

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile('index.html')
})
app.post('/message', async function (req, res) {
    console.log(req.body);
    // validation
    const {
      name, mail, message
    } = await req.body;
    var ajv = new Ajv();
    const validate = await ajv.compile(messageSchema);
    const valid = await validate(req.body);
    console.log(`VALIDATION: ${valid}`);
    if (!valid) {
      const { errors } = validate;
      const result = {
        status: 'invalid data input',
      };
      console.log(errors);
      res.json(result);
    } 
    else {
      try {
        const newMessage = await new MessageModel({
          name,
          email,
          message
        });
        const data = await newMessage.save();
        res.redirect('/');
      } catch (err) {
        if (err) throw err;
      }
    }
})
 
app.listen(3001, function(){
  console.log("Listening on port 3001!");
});