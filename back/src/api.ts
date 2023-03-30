import express from "express"
import { Article } from "./interfaces/article"
const app = express.Router()

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

export default app
