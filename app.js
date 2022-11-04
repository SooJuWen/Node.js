const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

//express app
const app = express();

//connect to database
const dbURI = 'mongodb+srv://juwen:node1234@nodejw.1maqt6b.mongodb.net/mydatabase?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => 
    //listen for requests
    app.listen(3000),
    console.log('connected to mongoDB'))
.catch((err) => console.log(err))

//register view engine
app.set('view engine', 'ejs');

//middleware - it handles between request coming in and response going out
app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
})

app.use(express.static('public'));

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog 2',
        snippet: 'about my new blog 2 here',
        body: 'this is my new blog 2 body'
    });

    blog.save() //save to blog collection in database
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get('/single-blog', (req, res) => {
    Blog.findById('63648f2e3bfa8f456163fb53')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
})

//blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1})
    .then((result) => {
        res.render('index', {title: 'All Blogs', blogs: result})
    })
    .catch((err) => {
        console.log(err);
    })
})


app.get('/about', (req, res) => {
    //res.send('<p>Hello Express<p>');
    //res.sendFile('./views/about.html', {root: __dirname});
    //ejs
    res.render('about', {title: 'About'});
})

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create a new blog'});
})

//redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

//404 page
// use(), this function will handle every incoming requests
// Express run code from top to bottom, so if all get requests above
// didn't match then it will fire this function to send the html page
app.use((req, res) => {
    //res.status(404).sendFile('./views/404.html', {root: __dirname});
    //ejs
    res.status(404).render('404', {title: '404'});
})