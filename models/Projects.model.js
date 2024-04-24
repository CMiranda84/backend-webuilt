const { Schema, model} = require("mongoose");

const ProjectSchema = new Schema({
    user:{
			type: Schema.Types.ObjectId,
			ref: "User",
		},
title : String,
image : String,
description : String,
company: String,
price : Number,
duration : Number,
},
{
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
})

const Projects = model("Project", ProjectSchema);

module.exports = Projects