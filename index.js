const express = require("express")
const app = express()
require("dotenv").config()
const bodyParser = require("body-parser")
const morgan = require("morgan")
const PORT = process.env.PORT || 8282
const { WebClient } = require('@slack/client')
const web = new WebClient(process.env.BOT_USER_OAUTH_TOKEN)
const { createMessageAdapter } = require('@slack/interactive-messages')
const slackInteractions = createMessageAdapter(process.env.SLACK_VERIFICATION_TOKEN)
const Submission = require("./models/submission")
const mongoose = require("mongoose")

mongoose.connect(
    "mongodb://localhost:27017/assignment-submissions",
    { useNewUrlParser: true },
    err => {
        if (err) throw err
        console.log("Connected to the database")
    }
)

app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

slackInteractions.action("vschool_assignment_submission", (payload, respond) => {
    console.log(payload)
    const newSubmission = payload.submission
    newSubmission.studentSlackId = payload.user.id
    newSubmission.channelId = payload.channel.id
    web.users.info({user: payload.user.id})
        .then(response => {
            newSubmission.studentName = response.user.real_name
            return web.conversations.info({channel: payload.channel.id})
        })
        .then(response => {
            // console.log(response)
            newSubmission.channelName = response.channel.name
            const submittedAssignment = new Submission(payload.submission)
            return submittedAssignment.save()
        })
        .then(() => {
            respond({ text: `Thanks for submitting the ${payload.submission.assignmentName} assignment! Be checking Github for feedback.` })
        })
        .catch(err => respond({text: "There was an error"}))
})

app.post("/submit", (req, res) => {
    web.dialog.open({
        trigger_id: req.body.trigger_id,
        dialog: {
            callback_id: "vschool_assignment_submission",
            title: "Submit an Assignment",
            elements: [
                {
                    label: "Name of Assignment",
                    name: "assignmentName",
                    type: "text"
                },
                {
                    label: "Github URL of Assignment",
                    name: "githubUrl",
                    type: "text",
                    placeholder: "Make sure to drill down to the correct folder for only this assignment first!"
                }
            ]
        }
    })
    return res.end()
})

app.use("/slack/actions", slackInteractions.expressMiddleware())
app.use("/submissions", require("./routes/submissions"))

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
})