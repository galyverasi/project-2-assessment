const express = require('express')
const methodOverride = require('method-override')
const db = require('./models')
const ejsLayouts = require('express-ejs-layouts')

const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(express.static(__dirname+'/static'))
app.use(methodOverride('_method'))
app.use(ejsLayouts)

// WRITE YOUR ROUTES HERE /////////////
app.get('/', (req, res) => {
    db.widget.findAll()
    .then((widgets) => {
        res.render('index', {widgets})
    })
    .catch(error => {
        console.log(error)
    })
})

// ADD A WIDGET
app.post('/', (req, res) => {
    db.widget.create({
        description: req.body.description,
        quantity: req.body.quantity
    })
    .then(widget => {
        res.redirect('/')
    })
})

// DELETE A WIDGET
app.delete('/:id', (req, res) => {
    db.widget.destroy({
        where: {id: req.params.id}
    })
    .then((widget) => {
        res.redirect('/')
    })
    .catch(error => {
        console.log(error)
    })
})
// YOUR ROUTES ABOVE THIS COMMENT /////

app.listen(process.env.PORT || 3000)
