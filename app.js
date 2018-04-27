const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

//Map global promise - rid warning
mongoose.Promise = global.Promise;
//connect to mongoose
mongoose.connect('mongodb://localhost/pioneer-dev', {
    useMongoClient: true
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

//Load idea Model
require('./models/Idea');
const Idea = mongoose.model('ideas');

//handlebars middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

/*How middleware works
app.use(function(req, res, next){
    console.log(Date.now());
    req.name = 'Kevin';
    next();
})
*/

//Index route
app.get('/',(req, res) => {
    const title = 'Welcome';
    res.render('index', {
        title:title});
});

//about route
app.get('/about', (req, res) => {
   res.render('about');
})

//Buy&Sell route
app.get('/buysell', (req, res) => {
    res.render('buysell');
 })

 //Housing route
 app.get('/housing', (req, res) => {
    res.render('housing');
 })

 //Add Idea form
 app.get('/ideas/add', (req, res) => {
    res.render('ideas/add');
 })

 //Process Form
 app.post('/ideas', (req, res) => {
     res.send('ok');
 });

const port = 5000;
app.listen(port, () =>{
    console.log(`Server started on port ${port}`);
});