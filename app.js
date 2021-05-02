const express = require('express');
const session = require('express-session');
const expressWs = require('express-ws');

const app = express();
// websocket support
expressWs(app);

/**/

// pug template engine
// app.set('view engine', 'pug');
// app.set('views', 'public');

// support sessions
app.use(session({secret: 'OnCCoSecret'}));

// support json- and url-encoded bodies
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// redirect static files
app.use(express.static('public'));
app.use("/node_modules", express.static('node_modules'));

/**/

// spawn child process
const {spawn} = require('child_process');

app.ws('/', (ws, req) => {

  ws.on('message', msg => {
    
    // http://download.savannah.gnu.org/releases/tinycc/
    let subprocess = spawn(
      'tcc', ['-run', '-'],
      {stdio: [
        'pipe', 'pipe', 'pipe'
      ]}
    );
    
    // write to stdin
    subprocess.stdin.write(msg);
    subprocess.stdin.end();
    
    subprocess.stdout.on('data', (data) => {
      ws.send(JSON.stringify({
        type: 'stdout', data: data.toString()
      }));
    });  

    subprocess.stderr.on('data', (data) => {
      ws.send(JSON.stringify({
        type: 'stderr', data: data.toString()
      }));
    }); 

    subprocess.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });

  });

  ws.on('close', () => {
      console.log('websocket disconnected ...');
  });

  req.end();

});

app.get('/', (req, res) => {
  res.sendFile("index.html");
});

app.listen(8080, '0.0.0.0', () => {
  console.log('http://0.0.0.0:8080')
});