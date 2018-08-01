const mongoose = require("mongoose")
const submissionSchema = new mongoose.Schema({
    assignmentName: {
        type: String,
        required: true
    },
    githubUrl: {
        type: String,
        required: true
    },
    student: {
        name: String,
        slackId: String
    },
    channel: {
        name: String,
        slackId: String
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model("Submission", submissionSchema)