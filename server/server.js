//require
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

//uses
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

//PORT listen
app.listen(PORT, () => {
    console.log('server running on port:', PORT);
}); //end of app.listen