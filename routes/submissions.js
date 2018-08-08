const { Router } = require("express")
const expressJwt = require("express-jwt");
const submissionRoutes = new Router()
const Submission = require("../models/submission")

submissionRoutes.use(expressJwt({ secret: process.env.SECRET }));

submissionRoutes.get("/", (req, res) => {
    Submission.find((err, list) => {
        if (err) return res.status(500).send(err)
        return res.send(list)
    })
})

submissionRoutes.put("/:id", (req, res) => {
    Submission.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, updatedSubmission) => {
            if (err) return res.status(500).send(err)
            return res.send(updatedSubmission)
        }
    )
})

module.exports = submissionRoutes