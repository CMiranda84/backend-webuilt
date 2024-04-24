const router = require("express").Router()
const isAuthenticated = require("../middlewares/isAuthenticated.js");
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
router.use(isAuthenticated)

router.post("/:projectId", isAuthenticated, async (req, res, next)=>
{
    try {
		const text = req.body.text
		const projectId= req.params.projectId
		const user = req.currentUserId 
        const newComment = await Comment.create({text, user, project: projectId});
        res.status(201).json(newComment)
        
    } catch (error) {
        next(error)
    }
})
router.delete("/:commentId", isAuthenticated, async (req, res, next) => {
	try {
		await Comment.findOneAndDelete({
			_id: req.params.commentId, user: req.currentUserId,
		})
		res.sendStatus(204)
	} catch (error) {
		next(error)
	}
})

module.exports = router