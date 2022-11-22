import Comment from "../modal/comment.js";



// Add Comment
export const addComment = async (req, res)=>{
    try {
        const comment = new Comment(req.body);

        await comment.save();

        return res.status(200).json({msg: 'Comment Saved Successfully!'});
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}


// Get all comments by post id
export const getComment = async (req, res)=>{
    
    try {
        const comment = await Comment.find({postId: req.params.id});
        if(!comment){
            return res.status(404).json({msg: 'Comment Not Found!'});
        }
        return res.status(200).json(comment);
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}


// delete comments by id
export const deleteComment = async (req, res)=>{
    
    try {
        const comment = await Comment.findById(req.params.id);
        if(!comment){
            return res.status(404).json({msg: 'Comment Not Found!'});
        }
        
        await comment.delete();
        return res.status(200).json({msg: 'Post Deleted Successfully!'});
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}