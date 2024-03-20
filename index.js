require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const DBconnection = require('./DB.config');

const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.get('/', (req, res) => {
    res.send('Welcome to API');
});

// GET codes

app.get('/codes', (req, res) => {
    const SQL = 'SELECT * FROM code;'

    DBconnection.query(SQL, (err, result) => {
        if (err) {
            res.status(400).send({error: err, message: 'Error fetching data'});
        } else {
            res.status(200).send(result);
        }
    });

});

// GET code

app.get('/codes/:id', (req, res) => {
    const id = req.params.id;
    const SQL = `SELECT * FROM code WHERE id = ${id};`

    DBconnection.query(SQL, (err, result) => {
        if (err) {
            res.status(400).send({error: err, message: 'Error fetching data'});
        } else {
            res.status(200).send(result);
        }
    });

});


// ADD codes

app.post('/codes', (req, res) => {

    const username = req.body.username
    const code = req.body.code
    const Language = req.body.language
    const StdIn = req.body.stdIn
    // const StdOut = req.body.StdOut
    const escapedCode = code.replace(/'/g, "\\'");
    const SQL = `INSERT INTO code (Username, Language, Code, StdIp, StdOut) VALUES ('${username}', '${Language}', '${escapedCode}', '${StdIn}', 'Hello, world!');`;

    DBconnection.query(SQL, (err, result) => {
        if (err) {
            res.status(400).send({error: err, message: 'Error fetching data'});
        } else {
            res.status(200).send(result);
        }
    });

});

// DELETE codes

app.delete('/codes/:id', (req, res) => {
    const id = req.params.id;
    const SQL = `DELETE FROM code WHERE id = ${id};`

    DBconnection.query(SQL, (err, result) => {
        if (err) {
            res.status(400).send({error: err, message: 'Error fetching data'});
        } else {
            res.status(200).send(result);
        }
    });

});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
