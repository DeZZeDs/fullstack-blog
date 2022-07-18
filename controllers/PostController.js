const PostModel = require('../models/Post.js');

class PostController {
    async createPost (request,response) {
        try {
            const document = new PostModel({
                title: request.body.title,
                text: request.body.text,
                tags: request.body.tags,
                imageUrl: request.body.imageUrl,
                author: request.userID
            });
            const post = await document.save();
            return response.json({ post });
        }
        catch(error) {
            console.log(error);
            return response.status(500).json({
                msg: "Не удалось создать пост"
            })
        }
    }
    async getAllPosts (request, response) {
        try{
            const posts = await PostModel.find().populate('author').exec();
            return response.json({
                posts
            });
        }
        catch(error) {
            console.log(error);
            return response.status(500).json({
                msg:"Не удалось получить посты"
            });
        }
    }
    async getPostByID (request, response) {
        try {
            const postID = request.params.id;
            const filter = { _id: postID };
            const { author } = await PostModel.findOneAndUpdate(filter).populate('author').exec();
            console.log(author);
            PostModel.findOneAndUpdate({
                _id: postID,
            }, {
                $inc: { viewsCount: 1 }
            }, {
                returnDocument: 'after'
            }, (error, document) => {
                if(error) {
                    console.log(error);
                    return response.json({ msg: "Не удалось получить статью" });
                }
                if(!document) {
                    console.log(error);
                    return response.json({ msg: "Статья не найдена" });
                }
                return response.json(
                    {
                        document,
                        author
                    }
                );
            })
        }
        catch(error) {
            console.log(error);
            return response.status(500).json({
                msg:"Не удалось получить статью"
            })
        }
    }
    async deletePost (request, response) {
        try {
            const postID = request.params.id;
            PostModel.findOneAndDelete({
                _id: postID,
            }, {
                returnDocument: 'after'
            }, (error, document) => {
                if(error) {
                    console.log(error);
                    return response.status(500).json({ msg: "Не удалось удалить статью" });
                }
                if(!document) {
                    console.log(error);
                    return response.status(404).json({ msg: "Статья не найдена" });
                }
                return response.status(200).json({ msg: "Статья успешно удалена!" });
            })
        }
        catch(error) {
            console.log(error);
            return response.status(500).json({
                msg:"Не удалось получить статью"
            })
        }
    }
    async updatePost (request, response) {
        try {
            const postID = request.params.id;
            PostModel.updateOne({
                _id: postID,
            },{
                title: request.body.title,
                text: request.body.text,
                tags: request.body.tags,
                imageUrl: request.body.imageUrl,
            }, {
                returnDocument: 'after'
            }, (error, document) => {
                if(error) {
                    console.log(error);
                    return response.status(500).json({ msg: "Не удалось отредактировать статью" });
                }
                if(!document) {
                    console.log(error);
                    return response.status(404).json({ msg: "Статья не найдена" });
                }
                return response.status(200).json({ msg: "Статья успешно изменена" });
            })
        }
        catch (error) {
            console.log(error);
            return response.status(500).json({msg: "Не удалось отредактировать статью"})
        }
    }
    async getTags (request, response) {
        try{
            const posts = await PostModel.find().limit(5).exec();
            const tags = posts.map((post) => post.tags).flat().slice(0, 5);
            return response.status(200).json(
                tags
            );
        }
        catch(error) {
            console.log(error);
            return response.status(500).json({
                msg:"Не удалось получить тэги"
            });
        }
    }
}

module.exports = new PostController();