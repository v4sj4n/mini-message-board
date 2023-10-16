const express = require("express")
const exphbs = require("express-handlebars")
const Handlebars = require("handlebars")
const uuid = require("uuid")
const db = require("./db")

const app = express()

// set engine
app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")
app.set("views", "./views")

Handlebars.registerHelper("formatDate", (date) => {
  const options = {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  }
  const formattedDate = new Date(date).toLocaleDateString("en-US", options)
  return formattedDate
})

app.use(express.urlencoded({ extended: false }))

/* GET home page. */
app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM messages")
    const messages = result.rows

    await res.render("index", { title: "Message Board", messages })
  } catch (err) {
    console.error(err)
    return res.status(400).render("error", { title: "Message Board" })
  }
})

/* POST request */
app.post("/add-message", (req, res) => {
  const newMember = {
    name: req.body.name,
    message: req.body.message,
  }

  if (!newMember.name || !newMember.message) {
    return res.status(400).render("error", { title: "Message Board" })
  }

  db.query(`INSERT INTO messages (name, message)
      VALUES ('${newMember.name}', '${newMember.message}')`)

  setTimeout(() => {
    res.redirect("/")
  }, 666)
})

module.exports = app
