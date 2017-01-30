
'use strict';

const express = require('express');
const knex = require('../knex');



const router = express.Router();

// YOUR CODE HERE
router.get('/', (_req, res, next) => {
  knex.select('id', 'title', 'description', 'price', 'item_image')
  .from('classifieds')
  .orderBy('id')
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    next (err);
  });
});

router.get('/:id', (req, res, next) => {
  knex.select('id', 'title', 'description', 'price', 'item_image')
    .from('classifieds')
    .where('id', req.params.id)
    .first()
    .then((results) => {
      if (!results) {
        return next();
      }

      res.send(results);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/', (req, res, next) => {
  knex('classifieds')
  .insert({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    item_image: req.body.item_image
    }, '*')
  .then((data) => {
    var obj = {
      id: data[0].id,
      title: data[0].title,
      description: data[0].description,
      price: data[0].price,
      item_image: data[0].item_image
    };
    res.status(200).send(obj);
  })
  .catch((err) => {
    next(err);
  });
});

router.patch('/:id', (req, res, next) => {
  knex('classifieds')
    .update({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      item_image: req.body.item_image
    }, '*')
    .where('id', req.params.id)
    .then((result) => {
      var obj = {
        id: result[0].id,
        title: result[0].title,
        description: result[0].description,
        price: result[0].price,
        item_image: result[0].item_image
      };
      res.send(obj);
    })
    .catch((err) => {
      next(err);
    });
  });

  router.delete('/:id', (req, res, next) => {

  knex('classifieds')
    .where('id', req.params.id)
    .first()
    .then((row) => {
      if (!row) {
        return next();
      }


      return knex('classifieds')
        .del()
        .where('id', req.params.id);
    })
    .then((result) => {
      var obj = {
        id: result[0].id,
        title: result[0].title,
        description: result[0].description,
        price: result[0].price,
        item_image: result[0].item_image
      };
      delete result.id;
      res.send((obj));
    })
    .catch((err) => {
      next(err);
    });
});


module.exports = router;
