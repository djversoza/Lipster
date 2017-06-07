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

router.get('/getCust', (req, res, next) =>{
  knex.raw(`SELECT * FROM customers where seller_id = ?`, [req.cookies.id]).then(data =>{
    res.send(data)
  })
});

router.get('/:id/getOneCust', (req, res, next) =>{
  let id = req.params.id
  knex.raw(`SELECT * from cust_sales where cust_id = ${id}`).then(data =>{
    res.send(data)
  })
});

router.post('/addCust', (req, res, next) =>{
    knex.raw(`INSERT into customers(name, seller_id) values(?,?)`, [req.body.name, req.cookies.id]).then(data =>{
      res.send(data)
    })
});

router.get('/getsale', (req, res, next) =>{
  knex.raw(`SELECT * from cust_sales where seller_id = ${req.cookies.id}`).then(data =>{
    res.send(data)
  })
});

router.get('/:id/theseSales', (req, res, next) =>{
  let id = req.params.id;
  knex.raw(`SELECT * FROM cust_sales where prod_id = ?`, [id]).then(data =>{
    if(req.cookies.id == data.rows[0].seller_id){
    res.send(data.rows)
    }
  })
})

router.post('/newsale', (req, res, next) =>{
  knex.raw(`SELECT * from items where id = ${req.body.item}`).then(data =>{
    let total = (parseInt(req.body.quantity) * parseInt(data.rows[0].cost)) + ((parseInt(data.rows[0].tax)/100) * (parseInt(data.rows[0].cost) - (parseInt(data.rows[0].cost) * parseInt(data.rows[0].discount)/100)))
    let sale = ((data.rows[0].retail_cost * req.body.quantity) - total)
    let discount = ((data.rows[0].retail_cost * req.body.quantity) - total) * (req.body.discount/100)
    let totalSale = sale - discount
    knex.raw(`SELECT * from customers where id = ?`, [req.body.cust]).then(data2 =>{
    knex.raw(`INSERT into cust_sales(seller_id, cust_id, sales_tax, sales_discount, sale_cost,
    total_sale, sale_quantity, prod_id, customer_name, product_name) values(?,?,?,?,?,?,?,?,?,?)`,
    [req.cookies.id,
     req.body.cust,
     data.rows[0].tax,
     req.body.discount,
     data.rows[0].retail_cost,
     totalSale,
     req.body.quantity,
     req.body.item,
     data2.rows[0].name,
     data.rows[0].name]
   ).then(data3 =>{

       console.log(data3)
       res.send(data3)
       })
     })
  })
})

// router.post('/', (req, res, next) =>{
//   let total =  (parseInt(req.body.quantity) * parseInt(req.body.cost)) + ((parseInt(req.body.tax)/100) * (parseInt(req.body.cost) - (parseInt(req.body.cost) * parseInt(req.body.discount)/100)))
//   knex.raw('INSERT into items(name, color, user_id, quantity, cost, tax, discount, total_cost, retail_cost) VALUES (?,?,?,?,?,?,?,?,?)',
//   [req.body.name,
//    req.body.color,
//    req.cookies.id,
//    req.body.quantity,
//    req.body.cost,
//    req.body.tax,
//    req.body.discount,
//    total,
//    req.body.retail_cost
//  ]).then(data =>{
//     res.send(data)
//   })
// });

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
});





module.exports = router;
