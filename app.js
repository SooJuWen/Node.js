const express = require('express');

//express app
const app = express();

//listen for requests
app.listen(3000);

app.get('/', (req, res) => {
    //res.send('<p>Hello Express<p>');
    res.sendFile('./views/index.html', {root: __dirname});
})


app.get('/about', (req, res) => {
    //res.send('<p>Hello Express<p>');
    res.sendFile('./views/about.html', {root: __dirname});
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
    res.status(404).sendFile('./views/404.html', {root: __dirname});
})