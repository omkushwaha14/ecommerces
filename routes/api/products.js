const route = require('express').Router();
const Product =require('../../db').Product

route.get('/',(req,res)=>{
    Product.findAll()
        .then((products)=>{
            res.status(200).send(products)
        }).catch((err)=>{
            res.status(500).send({
                error:'could not retrieve product'
            })
    })
})

route.post('/',(req,res)=>{

    if(isNaN(req.body.price)){
        return req.status(403).send({
            error:'price is not valid'
        })
    }
    Product.create({
        name:req.body.name,
        manufacturer:req.body.manufacturer,
        price:parseFloat(req.body.price)
    }).then((product)=>{
        res.status(201).send(product)
    }).catch((error)=>{
        res.status(501).send({
            error:'error adding products'
        })
    })
})






exports = module.exports = route