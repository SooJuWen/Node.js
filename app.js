const express = require('express');

//express app
const app = express();

//register view engine
app.set('view engine', 'ejs');

//listen for requests
app.listen(3000);

//middleware - it handles between request coming in and response going out
app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
})

app.use(express.static('public'));

app.get('/', (req, res) => {
    //res.send('<p>Hello Express<p>');
    //res.sendFile('./views/index.html', {root: __dirname});
    //ejs
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ];
    res.render('index', {title: 'Home', blogs});
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