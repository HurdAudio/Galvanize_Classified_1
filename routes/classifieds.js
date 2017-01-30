
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

router.post('/', (req, res, next) =>{
  knex('classifieds')
     .insert({
       title: req.body.title,
       description: req.body.description,
       price: req.body.price,
       item_image: req.body.item_image
     }, ['id', 'title', 'description', 'price', 'item_image'])
     .then((results)=>{
       res.send(results[0]);
     })
     .catch((err)=>{
       next(err);
     });
});

router.patch('/:id', (req, res, next) =>{
  knex('classifieds')
     .where('id', req.params.id)
     .update({
       title: req.body.title,
       description: req.body.description,
       price: req.body.price,
       item_image: req.body.item_image
     }, ['id', 'title', 'description', 'price', 'item_image'])
     .then((results)=>{
       res.send(results[0]);
     })
     .catch((err)=>{
       next(err);
     });
});

router.delete('/:id', (req, res, next) =>{
knex('classifieds')
   .where('id', req.params.id)
   .returning(['id', 'title', 'description', 'price', 'item_image'])
   .del()
   .then((results)=>{
     res.send(results[0]);
   })
   .catch((err)=>{
     next(err);
   });
});


module.exports = router;
