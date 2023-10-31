const express = require('express')
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
require('./db')
const moment = require('moment')
const Message = require('./models/message')
const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access')

const app = express()

// set engine
app.engine(
  'handlebars',
  exphbs.engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
      formatDate: function (date) {
        const formattedDate = moment(date)
          .utcOffset('+02:00')
          .format('YYYY-MM-DD HH:mm:ss')
        return formattedDate
      },
    },
  })
)
app.set('view engine', 'handlebars')
app.set('views', './views')
app.use(express.urlencoded({ extended: false }))

/* GET home page. */
app.get('/', async (req, res) => {
  try {
    const messages = await Message.find()
    console.log(messages)

    res.render('index', { title: 'Message Board', messages })
  } catch (err) {
    console.error(err)
    return res.status(400).render('error', { title: 'Message Board' })
  }
})

/* POST request */
app.post('/add-message', async (req, res) => {
  const newMember = {
    name: req.body.name,
    message: req.body.message,
  }

  if (!newMember.name || !newMember.message) {
    return res.status(400).render('error', { title: 'Message Board' })
  }

  await new Message(newMember).save()

  res.redirect('/')
})

module.exports = app
