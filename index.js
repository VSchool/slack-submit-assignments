const express = require("express");
const path = require("path");
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
    process.env.MONGOOSE_URI,
    { useNewUrlParser: true },
    err => {
        if (err) throw err
        console.log("Connected to the database")
    }
)

app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.use("/slack/actions", slackInteractions.expressMiddleware())
app.use("/api/submissions", require("./routes/submissions"))

slackInteractions.action("vschool_assignment_submission", (payload, respond) => {
    const newSubmission = payload.submission

    // Validate the incoming Github URL string
    console.log(/^https:\/\/github\.com/g.test(newSubmission.githubUrl))
    if (/^https:\/\/github\.com/g.test(newSubmission.githubUrl) === false) {
        return {
            errors: [{
                name: "githubUrl",
                error: "Must be a valid Github Url. Please open your Github account, click into the assignment's folder, and copy the url from the address bar."
            }]
        }
    }
    newSubmission.student = {
        slackId: payload.user.id
    }
    newSubmission.channel = {
        slackId: payload.channel.id
    }
    web.users.info({ user: payload.user.id })
        .then(response => {
            newSubmission.student.name = response.user.real_name
            return web.conversations.info({ channel: payload.channel.id })
        })
        .then(response => {
            newSubmission.channel.name = response.channel.name
            const submittedAssignment = new Submission(payload.submission)
            return submittedAssignment.save()
        })
        .then(() => {
            respond({ text: `Thanks for submitting the ${payload.submission.assignmentName} assignment! Be checking Github for feedback.` })
        })
        .catch(err => respond({ text: "There was an error:", err }))
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

//auth route
app.use("/auth", require("./routes/auth"));

//serve client
app.use("/admin", express.static(path.join(__dirname, "client", "dist")));
app.get("/admin/*",(req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

//handle errors
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.statusMessage = err.message;
        return res.status(err.status || 500).send();
    });
}

app.use((err, req, res, next) => {
    res.statusMessage = err.message;
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: {}
    });
});



app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
})