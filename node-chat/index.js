const express = require('express')
const cors= require('cors')
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1797907",
  key: "db9e9cd7a132c8a17973",
  secret: "8f28824b399c3f4c22e8",
  cluster: "ap2",
  useTLS: true
});

const app = express();

app.use(cors({
    origin:['http://localhost:3000','http://localhost:8080','http://localhost:4200']
}))

app.use(express.json())

app.post('/api/messages', async(req,res)=>{
    await pusher.trigger("chat", "message", {
        username:req.body.username,
        message: req.body.message
      });
      res.json({body:[]});
})

console.log('listening to port 8000')
app.listen(8000)