const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const itemRoutes = express.Router();
const PORT = 4000;

let Item = require('./Item');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/Item', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

itemRoutes.route('/').get(function(req, res) {
    Item.find(function(err, items) {
        if (err) {
            console.log(err);
        } else {
            res.json(items);
        }
    });
});

itemRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Item.findById(id, function(err, item) {
        res.json(item);
    });
});

itemRoutes.route('/add').post(function(req, res) {
    let item = new Item(req.body);
    item.save()
        .then(item => {
            res.status(200).json({'item': 'Item added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new Item failed');
        });
});

itemRoutes.route('/update/:id').post(function(req, res) {
    Item.findById(req.params.id, function(err, item) {
        if (!item)
            res.status(404).send('data is not found');
        else
            item.item_name = req.body.item_name;
            item.item_description = req.body.item_description;
            item.item_quantity = req.body.item_quantity;
            item.item_url = req.body.item_url;


            item.save().then(item => {
                res.json('ITEM updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});



itemRoutes.delete('/delete/:id', function(req, res, next) {
    let id = req.params.id;
    Item.findByIdAndRemove(id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

app.use('/item', itemRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});