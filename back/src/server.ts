console.log("About to start a server...")

import express, { Request, Response, NextFunction } from "express"
import serveIndex from "serve-index"
import api from "./api"

const app = express()
const port: number = 3000
const publicDir = "."

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.method, req.path)
  next()
}

app.use(logger)

app.use("/api", api)

app.use(express.static(publicDir))
app.use(serveIndex(publicDir, { icons: true }))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
