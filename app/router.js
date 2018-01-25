const express = require('express');
const router = express.Router();

const User = require('./modelo/user');

router.get('/api/persona', (req, res) => {
    User.find({}, (err, user) => {
        if (err)  {
            res.json(err)
        }
        else return res.json(user);
    });
});

router.post('/api/persona', (req, res) => {
    delete req.body._id;
    User.create(req.body, (err, user) => {
        if (err)  {
            res.json(err)
        }
        else return res.json(user);
    });
});

router.post('/api/borrar', (req, res) => {
    User.deleteOne({_id: req.body._id}, (err, data) => { 
        if (err) {
            return res.json(err)
        } else {
          return  res.json(data)
        }
    });
});

router.post('/api/personaUpdat', (req, res) => {

    User.update(req.body, (err, user) => {
        if (err) {
          return  res.json(err)
        } else {
          return  res.json(user)
        }
    });
   
   
});

module.exports = router;