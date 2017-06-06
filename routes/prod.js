var express = require('express');
const router = express.Router()
const knex = require('../db/knex')

router.get('/', (req, res, next) =>{
  knex.raw('SELECT * FROM items where user_id = ?', [req.cookies.id]).then(data =>{
    res.send(data.rows)
  })
});

router.post('/', (req, res, next) =>{
  let total =  (parseInt(req.body.quantity) * parseInt(req.body.cost)) + ((parseInt(req.body.tax)/100) * (parseInt(req.body.cost) - (parseInt(req.body.cost) * parseInt(req.body.discount)/100)))
  knex.raw('INSERT into items(name, color, user_id, quantity, cost, tax, discount, total_cost, retail_cost) VALUES (?,?,?,?,?,?,?,?,?)',
  [req.body.name,
   req.body.color,
   req.cookies.id,
   req.body.quantity,
   req.body.cost,
   req.body.tax,
   req.body.discount,
   total,
   req.body.retail_cost
 ]).then(data =>{
    res.send(data)
  })
});

router.post('/', (req, res, next) =>{
  let total =  (parseInt(req.body.quantity) * parseInt(req.body.cost)) + ((parseInt(req.body.tax)/100) * (parseInt(req.body.cost) - (parseInt(req.body.cost) * parseInt(req.body.discount)/100)))
  knex.raw('INSERT into items(name, color, user_id, quantity, cost, tax, discount, total_cost, retail_cost) VALUES (?,?,?,?,?,?,?,?,?)',
  [req.body.name,
   req.body.color,
   req.cookies.id,
   req.body.quantity,
   req.body.cost,
   req.body.tax,
   req.body.discount,
   total,
   req.body.retail_cost
 ]).then(data =>{
    res.send(data)
  })
});

router.get('/:id', (req, res, next) =>{
  let id = req.params.id
  knex.raw(`SELECT * FROM items where id = ?`, [id]).then(data =>{
    if(req.cookies.id == data.rows[0].user_id){
    res.send(data.rows)
    }
  })
})

router.delete('/:id', (req, res, next) =>{
  knex.raw(`DELETE from items where id = ${req.params.id}`).then(data =>{
    res.send(data)
  })
})

router.patch('/:id', (req, res, next) =>{
  let id = req.params.id
  let total =  (parseInt(req.body.quantity) * parseInt(req.body.cost)) + ((parseInt(req.body.tax)/100) * (parseInt(req.body.cost) - (parseInt(req.body.cost) * parseInt(req.body.discount)/100)))
  knex.raw(`UPDATE items set name=?, color=?, user_id=?, quantity=?, cost=?, tax=?, discount=?, total_cost=?, retail_cost=? where id = ${id}`, [req.body.name,
   req.body.color,
   req.cookies.id,
   req.body.quantity,
   req.body.cost,
   req.body.tax,
   req.body.discount,
   total,
   req.body.retail_cost]).then(data =>{
     res.send(data.rows)
  })
})

module.exports = router;
