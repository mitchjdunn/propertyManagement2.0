require('dotenv').config(); // read .env  files
const express = require('express');

const app = express();
const port = process.env.port || 3000;

// set public folder as root
app.use(express.static('public'));

// allow front-end access to node_modules folder
// Don't use single quotes for variables
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

//listen for http requests on port 3000;
app.listen(port, () => {
    console.log('listening on %d');
});

// Redirect all traffic to index.html
app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));
