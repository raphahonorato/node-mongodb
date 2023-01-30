const express = require('express');
const router = express.Router();
const db = require('../db');


//home page da aplicação
router.get('/', function (req, res, next) {
  db.findCustomers()
    .then(customers => {
      console.log(customers);
      res.render('index', { title: 'Express', customers });
    })
    .catch(error => console.log(error));
});


router.get('/new', (req, res) => {

  res.render('customer', { title: 'Cadastro de Clientes' });

})

router.post('/new', (req, res) => {
  if (!req.body.nome)
    return res.redirect('/new?error=O campo nome é obrigatório!')

  if (!req.body.idade)
    return res.redirect('/new?error=O campo idade é numérico')

  const nome = req.body.nome;
  const idade = parseInt(req.body.idade);
  const cidade = req.body.cidade;
  const uf = req.body.uf.length > 2 ? '' : req.body.uf;
  
  db.insertCustomer({ nome, idade, cidade, uf })
    .then(result => {

      res.redirect('/')

    })
    .catch(error => {
      return console.log(error)
    })
})


module.exports = router;