const express = require('express');
const app = express();
const path = require('path');

const os = require('os');
const yargs = require('yargs');
const user = os.userInfo();

// fs.appendFile('files/append-file.txt',`Hello world `,function(err){
//     if(err) {
//         console.log('Unable to write to file');
//     }
// })

// const encodedAddress = encodeURIComponent('1301 chatswood nsw');
// const decodedAddress = decodeURIComponent('1301%20lombord%20street%20philadelphia');

// const res = note.addNote(user.username);
// console.log(res);
// console.log(process.argv);
// console.log(yargs.argv);

// note.addCard();
const publicPath = path.join(__dirname , '/public');
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

require("./init/routes")(app);
require('./init/db')();
require("./init/config")();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
