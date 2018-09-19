var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var request = require('request');
var app = express()
var jwt = require('jwt-simple')

var User = require('./models/User.js')
var Post = require('./models/Post.js')
var auth = require('./auth.js')

mongoose.Promise = Promise

app.use(cors())
app.use(bodyParser.json())

app.get('/posts/', async (req, res) => {
    //var author = req.params.id
    var posts = await Post.find({})
    res.send(posts)
})

app.post('/post', auth.checkAuthenticated, (req, res) => {
    console.log(req.body.news);
    var postData = req.body;
    postData.author = req.userId

    
    request('http://127.0.0.1:5000/checknews/'+ req.body.news, function (error, response, body) {
        if (!error && response.statusCode == 200) {
        postData.fake = JSON.parse(body);
       

        var post = new Post(postData)

    post.save((err, result) => {
        if (err) {
            console.error('saving post error')
            return res.status(500).send({ message: 'saving post error' })
        }

        res.status(200).send(post);
    })
    }
    });


    
})


mongoose.connect('mongodb://root:root123@ds125341.mlab.com:25341/rednews', { useMongoClient: true }, (err) => {
    if (!err)
        console.log('connected to mongo')
})

app.use('/auth', auth.router)
app.listen(process.env.PORT || 3000)