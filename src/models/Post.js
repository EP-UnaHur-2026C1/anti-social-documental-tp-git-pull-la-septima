const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    texto : { 
        type : String, 
        required : true, 
        maxLength : 255
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    fechaPublicacion: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema)

module.exports = Post;
