const {Router} = require("express")
const submissionRoutes = new Router()
const Submission = require("../models/submission")

submissionRoutes.get("/", (req, res) => {
    Submission.find((err, list) => {
        if (err) return res.status(500).send(err)
        return res.send(list)
    })
})

module.exports = submissionRoutes