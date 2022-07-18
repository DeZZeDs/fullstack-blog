const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        default: []
    },
    viewsCount: {
      type: Number,
      default: 0
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    imageUrl: String,

}, {
    timestamps: true,
});

const postModel = mongoose.model('Post', PostSchema);

module.exports = postModel;