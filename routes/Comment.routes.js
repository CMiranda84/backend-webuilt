const router = require("express").Router()
const Comment = require("../models/Comment.model.js");


// router.get("/", async (req, res, next)=>
// {
//     /////check boardGame exapmles for this comments part why he used Comment.find({ user: req.currentUserId }).sort({publishDate: -1,})
//     try {
//         const myComments = await Comment.find();
//         res.json(myComments);
//     } catch (error) {
//         next(error)
//     }
// })

router.post("/:projectId", async (req, res, next)=>
{
    try {
        const newComment = await Comment.create(req.body);
        res.status(201).json(newComment)
        
    } catch (error) {
        next(error)
    }
})
router.delete("/:commentId", async (req, res, next) => {
	try {
		await Comment.findOneAndDelete({
			_id: req.params.commentId,
		})
		res.sendStatus(204)
	} catch (error) {
		next(error)
	}
})

module.exports = router