

const PORT = process.env.PORT || 3000;

const path = require("path");
const express = require("express");
const app = express(); // create express app


// add middleware
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));


app.get('/', (req, res) => {
  res.render('index')
})

app.get('*', (req, res) => {
  res.redirect('/')
})

// custom 404 page
app.use((req, res) => 
{
    res.status(404)
    res.render('404')
})

// custom 500 page
app.use((err, req, res, next) => 
{
    console.error(err.message)
    res.status(500)
    res.render('500')
})

// start express server on port 5000
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
