const express = require('express');
// https://teamtreehouse.com/community/difference-between-expressrouter-and-express-variables
const router = express.Router();
const fs = require("fs");
const path = require('path');


const dbPath = path.join(__dirname, "../public/assets/db.json");




/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* GET notes.html. */
router.get('/notes', function(req, res, next) {
    // for the user


    res.sendFile(path.join(__dirname, "../public/notes.html"));


    // res.render('index', { title: 'Express' });
});




/* GET notes.html. */
// for dev
router.get('/api/notes', function(req, res, next) {
    try {
        const data = fs.readFileSync(dbPath, "utf8");
        res.send(getDb());
    } catch (e) {
        console.log("Error:", e.stack);
        next(err);
    }
});

router.delete('/api/notes/:id', function(req, res, next) {
    try {
        console.log(req.params);
        const noteId = req.params.id;
        const db = getDb();

        for (let i = 0; i < db.length; i++) {
            const note = db[i];
            console.log(JSON.stringify(note));
            if (note.id == noteId) {
                db.splice(i, 1);
                break;
            }
        }
        fs.writeFileSync(dbPath, JSON.stringify(db), { encoding: 'utf8', flag: 'w' })
        res.send();
    } catch (e) {
        console.log("Error:", e.stack);
    }
});

router.post('/api/notes', function(req, res, next) {
    let db = getDb();
    db.push(req.body);
    fs.writeFileSync(dbPath, JSON.stringify(db), { encoding: 'utf8', flag: 'w' });
    res.send("hi");
});

router.get('/*', function(req, res, next) {
    res.sendFile(path.join(__dirname, "../public/index.html"));

});

// returns the object that we then give to send
function getDb() {
    const data = fs.readFileSync(dbPath, "utf8");
    return JSON.parse(data);
}
module.exports = router;