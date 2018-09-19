var mongoose = require('mongoose')


module.exports = mongoose.model('Post', {
    news: String,
    fake: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})