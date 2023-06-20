const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser");
const port = 8000;

const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}

// Define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

const Contact = mongoose.model('Contact', contactSchema);

// Express related stuff
app.use("/static", express.static("static"))  // For serving static file
app.use(express.urlencoded());

// Pug related stuff
app.set("view engine", "pug") // Set the template engine as pug
app.set("views", path.join(__dirname, "views")) // Set the view directory

// Endpoints
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post("/contact", (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.send("<h2>This item has been saved to the database</h2>")
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse")
    })
});

// Start the server
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});