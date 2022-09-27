const express = require('express');
const parser = require('body-parser');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
const path = require('path');

const PORT = 3001; // PORT = 3000 on deployable
const db = mysql.createPool({
    host: "localhost",
    user: "root", // statusdb
    password: "password",
    database: 'statusdb',
})

const con = mysql.createConnection({
    host: "localhost",
    user: "root", // statusdb
    password: "password", 
})

app.use(cors());
app.use(parser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../lydia-website/build')));

app.get('/api/', (request, response) => {
    response.send("Nice job finding this!");
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

app.post('/api/login/check', (request, response) => {
    const id = request.body.stringId;

    const sqlQuery = "SELECT * FROM auth WHERE auth_id = ?";
    db.query(sqlQuery, [id], (error, result) => {
        if (error || result.length != 1) {
            response.send({authentic: false, auth_id : "", username: ""});
            return;
        }
        const auth_id = result[0].auth_id;
        const username = result[0].name;
        response.send({authentic: true, auth_id : auth_id, username: username});
    })
})

app.post('/api/login', (request, response) => {
    const username = request.body.username;
    const password = request.body.password;

    const sqlQuery = "SELECT * FROM auth WHERE name = ? AND password = ?";
    db.query(sqlQuery, [username, password], (error, result) => {
        if (error || result.length != 1) {
            response.send({auth_id : "", username: ""});
            return;
        }
        const auth_id = result[0].auth_id;
        const username = result[0].name;
        response.send({auth_id : auth_id, username: username});
    })
})

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

app.listen(PORT, () => {
    console.log("Listening on port", PORT)
});