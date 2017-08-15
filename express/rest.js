const express = require("express");
//const bodyParser = require("body‐parser");
const app = express();

const restAPIv1 = express.Router();
const rpcAPIv2 = express.Router();

class User {
    constructor(name,score) {
        this.name = name;
        this.score = score;
    }
}

usersID = [];
users = [];

restAPIv1.get("/users/", function(req, res) {
    res.status(200).end(JSON.stringify(users));
});

restAPIv1.post("/users/", function(req, res) {
    try {
        let name = req.query.name;
        let score = req.query.score;
    }
    catch (err) {res.status(400).send('Bad request!');};
    let newUser = new User(name,score);
    userID = usersID.push(newUser);
    newUser.ID = userID;
    users.push(newUser);
    res.status(200).end(userID);
});

restAPIv1.get("/users/:id", function(req, res) {
    try {
        let ID = req.ID;
    }
    catch (err) {res.status(400).send('Bad request!')};
    res.status(200).end(JSON.stringify(users.find(user => user.ID == req.ID )));
});

restAPIv1.put("/users/:id", function(req, res) {
    try {
        let ID = req.ID;
        let score = req.score;
    }
    catch (err) {res.status(400).send('Bad request!')};
    let user = users.find(user => user.ID == req.ID );
    if (user === undefined) res.status(400).send('Wrong user\'s ID!');
    user.score = req.score;
    res.status(200).send('user\'s score is updated!');
});

restAPIv1.delete("/users/:id", function(req, res) {
    try {
        let ID = req.ID;
    }
    catch (err) {res.status(400).send('Bad request!')};
    let userIDX = users.findIndex(user => user.ID == req.ID );
    if (userIDX === undefined) res.status(400).send('Wrong user\'s ID!');
    users.splice(userIDX,1);
    res.status(200).send('User deleted!');
});

app.use("/api/v1", restAPIv1);
//app.use(bodyParser.urlencoded({extended: true}));
app.listen(3000, function() {
    console.log('listening on 3000')
})
