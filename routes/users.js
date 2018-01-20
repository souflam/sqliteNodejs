//importer le framework express
var express = require('express');
// on crée un router app en appelant la fonction express()
var router = express.Router();

//on importe le connexion a note db bia knex
var db = require('./../database');

//recuperation des données (utilisateurs)
router.get('/', function (req, res){
    db.select().from('utilisateur').then(function (data) {
        console.log(data);
        res.send(data);
    })
});

router.get('/:id', function (request, result) {
    db
        .select()
        .from('utilisateur')
        .where('id', request.params.id)
        .then(data => {
            result.send(data[0]);
        });
})



//insertion des données
router.post('/', function (req, res) {
    console.log(req.body);

    db
        .insert(JSON.parse(JSON.stringify(req.body)))
        .returning('*')
        .into('utilisateur')
        .then(function (data) {
            res.send(data);
        });
})

//mise a jour

router.put('/:id', function (req, res) {
    console.log('rest');
    //res.send(req.headers);
    db('utilisateur')
        .where('id', req.params.id)
        .update(req.body)
        .returning('*')
        .then(function (data) {
            res.send('test');
        });
});

//delete route

router.delete('/:id', function (req, res) {
    db('utilisateur').where('id', req.params.id).del().then(function () {
        res.json({success: true});
    })
});



module.exports = router;