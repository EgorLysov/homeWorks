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
    let name = req.query.name;
    let score = req.query.score;
    if (name===undefined||score===undefined) {res.status(400).send('Bad request!');};

    let newUser = new User(name,score);
    userID = usersID.push(newUser);
    newUser.id = userID;
    users.push(newUser);
    res.status(200).end(JSON.stringify(userID));
});

restAPIv1.get("/users/:id", function(req, res) {
    let id = req.params.id;
    if (id===undefined) {res.status(400).send('Bad request!');};
    let user = users.find(user => user.id == req.params.id )
    if (user === undefined) res.status(400).send('Wrong user\'s ID!');
    res.status(200).end(JSON.stringify(user));
});

restAPIv1.put("/users/:id", function(req, res) {
    let id = req.params.id;
    let score = req.query.score;
    if (id===undefined||score===undefined) {res.status(400).send('Bad request!')};

    let user = users.find(user => user.id == req.params.id);
    if (user === undefined) res.status(400).send('Wrong user\'s ID!');
    user.score = req.query.score;
    res.status(200).send('user\'s score is updated!');
});

restAPIv1.delete("/users/:id", function(req, res) {
    let id = req.params.id;
    if (id === undefined) {res.status(400).send('Bad request!')};
    let userIDX = users.findIndex(user => user.id == id );
    if (userIDX === undefined) res.status(400).send('Wrong user\'s ID!');
    console.log(userIDX);
    users.splice(userIDX,1);
    res.status(200).send('User deleted!');
});

app.use("/api/v1", restAPIv1);
//app.use(bodyParser.urlencoded({extended: true}));
app.listen(3000, function() {
    console.log('listening on 3000')
})
