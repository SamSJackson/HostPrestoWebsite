const express = require('express');
const parser = require('body-parser');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
const https = require('https');
const fs = require('fs');


const BASE_DIR = "/var/www/lydiabroadley.com"
// Use fs and generate SSL certificates to get these values
// const key = fs.readFileSync(BASE_DIR + '/server/certs/server.key');
// const cert = fs.readFileSync(BASE_DIR + '/server/certs/server.crt');

const PORT = 3001;
// const options = {
//     key: key,
//     cert: cert
// };

const db = mysql.createPool({
    host: "localhost",
    user: "statusdb", // statusdb
    password: "nD70wY928xFW", // nD70wY928xFW
    database: 'statusdb',
})

const con = mysql.createConnection({
    host: "localhost",
    user: "statusdb", // statusdb
    password: "nD70wY928xFW", // nD70wY928xFW
})

app.use(cors());
app.use(parser.urlencoded({extended: true}));
app.use(express.json());

app.get('/api/', (request, response) => {
    console.log("Successfully called");
    response.send("Nice job");
});

app.get('/api/statuses', (request, response) => {
    const sqlQuery = "SELECT * FROM basic_status ORDER BY createdAt DESC";
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
    const sqlQuery = "DELETE FROM basic_status WHERE id = (?)";
    db.query(sqlQuery, [_id], (error, result) => {
        if (error) {
            console.log(error);
            response.send(error);
        }
    });
    response.send("Success");
})


const server = https.createServer(app);
const host = server.address().address;

server.listen(() => {
    con.connect((error) => {
        if (error) throw error;
        console.log("Connected");
    });
    console.log(host);
})