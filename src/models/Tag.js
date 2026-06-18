const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
    nombre : { 
        type : String, 
        required : true
    },
    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post',
        required : true
    }
});

const Post = mongoose.model('Tag', tagSchema);

module.exports = Post;