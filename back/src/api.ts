import express, { json } from "express"
import { Article, NewArticle } from "./interfaces/article"
const app = express.Router()

const generateId = () => {
  return Date.now() + "_" + Math.round(Math.random() * 1e12)
}

let articles: Article[] = [
  {
    id: "a1",
    name: "Tournevis",
    price: 3.99,
    qty: 100,
  },
  {
    id: "a2",
    name: "Bêche",
    price: 5,
    qty: 54,
  },
]

app.get("/date", (req, res) => {
  res.json({ date: new Date() })
})

app.get("/articles", (req, res) => {
  res.json(articles)
})

app.use(json())

app.post("/articles", (req, res) => {
  const newArticle: NewArticle = req.body
  const article = { ...newArticle, id: generateId() }
  articles.push(article)
  res.json(articles)
})

export default app
