const express = require('express');
const parser = require('body-parser');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: 'statusdb',
})

app.use(cors());
app.use(parser.urlencoded({extended: true}));
app.use(express.json());

app.get('/api/statuses', (request, response) => {
    const sqlQuery = "SELECT * FROM basic_status ORDER BY createdAt DESC";
    db.query(sqlQuery, (error, result) => {
        if (error) {
            response.send(`error => ${error}`);
        }
        response.send(result);
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


app.listen(3001, () => {
    console.log("Running on port 3001");
})