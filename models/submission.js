const mongoose = require("mongoose")
const submissionSchema = new mongoose.Schema({
    assignmentName: String,
    githubUrl: String,
    studentSlackId: String,
    studentName: String,
    channelId: String,
    channelName: String
}, { timestamps: true })

module.exports = mongoose.model("Submission", submissionSchema)