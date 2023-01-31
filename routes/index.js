const express = require('express');
const router = express.Router();
const db = require('../db');


//home page da aplicação
router.get('/', function (req, res, next) {
  db.findCustomers()
    .then(customers => {
      // console.log(customers);
      res.render('index', { title: 'Express', customers });
    })
    .catch(error => {
      console.log(error)
      res.render('error', { message: 'Não foi possível listar os clientes!' , error})
    });
});


router.get('/new', (req, res) => {
  res.render('customer', { title: 'Cadastro de Clientes', customer: {} });
})


router.get('/edit/:customerId', (req, res) => {
  const id = req.params.customerId;
  db.findCustomer(id)
    .then(customer => res.render('customer', { title: 'Edição de cadastro', customer }))
    .catch(error => {
      console.log(error)
      res.render('error', { message: 'Não foi possível listar os dados do cliente!' , error})
    });
})


router.get('/delete/:customerId', (req, res) => {
  const id = req.params.customerId
  db.deleteCustomer(id)
    .then(result => res.redirect('/'))
    .catch(error => {
      console.log(error)
      res.render('error', { message: 'Não foi possível excluir o cliente!' , error})
    });
})


router.post('/new', (req, res) => {
  if (!req.body.nome)
    return res.redirect('/new?error=O campo nome é obrigatório!')

  if (!req.body.idade)
    return res.redirect('/new?error=O campo idade é numérico')

  const id = req.body.id;
  const nome = req.body.nome;
  const idade = parseInt(req.body.idade);
  const cidade = req.body.cidade;
  const uf = req.body.uf.length > 2 ? '' : req.body.uf;
  const customer = { nome, idade, cidade, uf }
  const promise = id ? db.updateCustomer(id, customer)
    : db.insertCustomer(customer);

  promise
    .then(result => {
      res.redirect('/')
    })
    .catch(error => {
      console.log(error)
      res.render('error', { message: 'Não foi possível salvar o cliente!' , error})
    });
})


module.exports = router;