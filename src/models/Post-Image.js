const mongoose = require("mongoose");

const postImageSchema = new mongoose.Schema({
    url_image : { 
        type : String, 
        required : true
    },
    id_post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post',
        required : true
    }
}, { timestamps : true })

const PostImage = mongoose.model('PostImage', postImageSchema)

module.exports = PostImage;
