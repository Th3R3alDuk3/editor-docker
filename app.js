const express = require('express')
const app = express()

// const exec = require('child_process');

/* static files */
app.use(express.static('public'));
app.use("/node_modules", express.static('node_modules'));

app.get('/', (req, res) => {
    res.sendFile('index.html')
})

app.listen(8080, () => {
  console.log('app listening at http://localhost:8080')
})