
const {Schema, model} = require("mongoose")

const commentSchema = new Schema (
    {
        user:{
			type: Schema.Types.ObjectId,
			ref: "User",
		},
        text:{
			type: String,
			minLength: 1,
			maxLength: 5000,
		},
        image: String,
        project:{
			type: Schema.Types.ObjectId,
			ref: "Project",
		},

    },
    {
		// this second object adds extra properties: `createdAt` and `updatedAt`
		timestamps: true,
	}
)
const Comment = model("Comment", commentSchema)

module.exports = Comment