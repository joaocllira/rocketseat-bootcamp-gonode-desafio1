const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

const verifyParameterAge = (req, res, next) => {
  if (!req.query.age) {
    return res.redirect('/')
  }

  return next()
}

app.get('/', (req, res) => {
  return res.render('index')
})

app.post('/check', (req, res) => {
  if (req.body.age == null || req.body.age == '') {
    return res.redirect('/')
  }
  const age = parseInt(req.body.age)
  if (age >= 18) {
    return res.redirect('/major?' + 'age=' + age)
  } else {
    return res.redirect('/minor?' + 'age=' + age)
  }
})

app.get('/major', verifyParameterAge, (req, res) => {
  return res.render('major', { age: req.query.age })
})

app.get('/minor', verifyParameterAge, (req, res) => {
  return res.render('minor', { age: req.query.age })
})

app.listen(3000)
