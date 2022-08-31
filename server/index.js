const express = require('express');
const parser = require('body-parser');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
const https = require('https');
const fs = require('fs');

// Use fs and generate SSL certificates to get these values
const key = fs.readFileSync('/certs/server.key');
const cert = fs.readFileSync('/certs/server.cert');

const PORT = 3001;
const options = {
    key: key,
    cert: cert
};

const db = mysql.createPool({
    host: "localhost",
    user: "statusdb", // statusdb
    password: "nD70wY928xFW", // nD70wY928xFW
    database: 'statusdb',
})

// const con = mysql.createConnection({
//     host: "localhost",
//     user: "statusdb", // statusdb
//     password: "nD70wY928xFW", // nD70wY928xFW
// })

app.use(cors());
app.use(parser.urlencoded({extended: true}));
app.use(express.json());

app.get('/api/', (request, response) => {
    console.log("Successfully called");
    response.send("Nice job");
});

app.get('/api/statuses', (request, response) => {
    const sqlQuery = "SELECT * FROM basic_status ORDER BY createdAt DESC";
    console.log("Getting statuses");
    db.query(sqlQuery, (error, result) => {
        if (error) {
            response.send(`error => ${error}`);
        }
        response.send(result);
    })
});

app.post('/api/statuses/add', (request, response) => {
    const _id = request.body.id;
    const text = request.body.text;
    const author = request.body.author;
    const createdAt = request.body.createdAt;
    const createdWhere = request.body.country;
    const newStatus = {
        _id,
        text,
        author,
        createdAt,
        createdWhere,
    };

    console.log("Adding status");
    const sqlQuery = "INSERT INTO basic_status (id, text, author, createdAt, createdWhere) VALUES (?, ?, ?, ?, ?)";
    db.query(sqlQuery, [_id, text, author, createdAt, createdWhere], (error, result) => {
        if (error) {
            console.log(error);
            response.send({_id:0, text: "", author: "", createdAt: new Date(), createdWhere: ""});
            return;
        }
        response.send(newStatus);
    })
})

app.post('/api/statuses/delete', (request, response) => {
    const _id = request.body.statusId;

    console.log("Deleting status");
    const sqlQuery = "DELETE FROM basic_status WHERE id = (?)";
    db.query(sqlQuery, [_id], (error, result) => {
        if (error) {
            console.log(error);
            response.send(error);
        }
    });
    response.send("Success");
})


const server = https.createServer(options, app);

server.listen(PORT, () => {
    console.log("Running on port", PORT);
    // con.connect((error) => {
    //     if (error) throw error;
    //     console.log("Connected");
    // });
})