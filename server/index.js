import { config } from 'dotenv'
import { Server } from 'socket.io'
import { join, resolve } from 'path'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import http from 'http'
import { fileURLToPath } from 'url'
import {dirname} from 'path'
config()

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))
const httpServer = http.createServer(app)

const io = new Server(httpServer,{
  cors:'http://localhost:4000'
})

const port = process.env.PORT || 3000 

process.env.NODE_ENV ==='development' && app.use(morgan('dev'))
app.use(cors())

app.use(express.static(resolve('./public')))

io.on("connection", (socket) => {
  socket.on('message',(data) => {
     socket.emit('data', { body:data, user:socket.id }) 
  })
});  

app.use(express.static(join(__dirname,'../client/build')))

httpServer.listen(port)
console.log('server startup on port', port)