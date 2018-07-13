const express = require('express');
const app = express();

app.use(express.static(__dirname + '/views')); // html
app.use(express.static(__dirname + '/public')); // js, css, images

const server = app.listen(5000);
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

const apiai = require('apiai')("8efdb44db6f8426d83254aa7f1800843 ");

io.on('connection', function(socket) {
    socket.on('chat message', (text) => {
  
      // Get a reply from API.AI
  
      let apiaiReq = apiai.textRequest(text, {
        sessionId: APIAI_SESSION_ID
      })
  
      apiaiReq.on('response', (response) => {
        let aiText = response.result.fulfillment.speech;
        socket.emit('bot reply', aiText); // Send the result back to the browser!
      });
  
      apiaiReq.on('error', (error) => {
        console.log(error);
      });
  
      apiaiReq.end();
  
    });
  });
  