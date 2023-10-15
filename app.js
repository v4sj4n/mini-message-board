const express = require("express")
const exphbs = require("express-handlebars")
const uuid = require("uuid")

const app = express()

// set engine
app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")
app.set("views", "./views")

app.use(express.urlencoded({ extended: false }))

const messages = [
  {
    id: uuid.v4(),
    name: "Vasjan",
    message: "Hello",
    date: new Date(),
  },
]

/* GET home page. */
app.get("/", (req, res) => {
  res.render("index", { title: "Message Board", messages })
})

/* POST request */
app.post("/add-message", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    message: req.body.message,
    date: new Date(),
  }

  if (!newMember.name || !newMember.message) {
    return res.status(400).render("error", { title: "Message Board" })
  }

  messages.push(newMember)
  res.redirect("/")
})

module.exports = app
