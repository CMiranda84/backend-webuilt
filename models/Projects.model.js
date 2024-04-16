const { Schema, model} = require("mongoose");

const ProjectSchema = new Schema({
title : String,
otherNames : [String],
image : String,
description : String,
// publishDate : Date,
company: String,
price : Number,
duration : Number,

})

const Projects = model("Project", ProjectSchema);

module.exports = Projects