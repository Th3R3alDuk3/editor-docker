const express = require('express');
const expressWs = require('express-ws');

const app = express();
expressWs(app);

/**/

// redirect static files
app.use(express.static('public'));
app.use("/node_modules", express.static('node_modules'));

// support json- and url-encoded bodies
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/**/

// spawn child process
const {spawn} = require('child_process');

app.ws('/', (ws, req) => {

  ws.on('message', msg => {
    
    console.log(msg);

    let process = spawn(
      'gcc', 
      ['-v']
    );

    process.stdout.on('data', (data) => { ws.send(`${data}`); });  
    process.stderr.on('data', (data) => { ws.send(`${data}`); }); 

    process.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });

  });

  ws.on('close', () => {
      console.log('websocket disconnected ...');
  });

  req.end();

});

app.get('/', (req, res) => {
  res.sendFile('index.html')
});

app.listen(8080, () => {
  console.log('http://localhost:8080')
});