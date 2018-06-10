var express = require('express');
var app = express();
var itemRouter = express.Router();

var Item = require('../models/Item');

//Route to add an element
itemRouter.route('/add/post').post(function(req, res) {
    console.log("backend ", req.body);
    var item = new Item(req.body);
    item.save()
    .then(item => {
        res.json('Item added successfully');
    })
    .catch(err => {
        res.status(400).send('Unable to save to database');
    });
});

//Route to fetch the data
itemRouter.route('/').get((req, res) => {
    Item.find(function(err, itms) {
        if(err) {
            console.log(err);
        }
        else {
            console.log(itms);
            res.json(itms); 
        }
    });
});

//Route to edit data
itemRouter.route('/edit/:id').get((req, res) => {
    var id = req.params.id;
    Item.findById(id, function(err, item) {
        res.json(item);
    });
});

//Route to update data
itemRouter.route('/update/:id').post((req, res) => {
    Item.findById(req.params.id,function(err, item) {
        if(!item) {
            return next(new Error('Could not load Document'));
        }
        else {
            item.item = req.body.item;
            item.save().then(item => {
                res.json('Update complete');
            })
            .catch(err => {
                res.status(400).send("unable to update the database");
            });
        }
    });
});

//Route to delete data
itemRouter.route('/delete/:id').get((req, res) => {
    Item.findByIdAndRemove({_id : req.params.id}, 
        function(err, item) {
            if(err) res.json(err);
            else res.json('Successfully removed');
        });
});

module.exports = itemRouter;