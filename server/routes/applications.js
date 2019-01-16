let express = require('express')
let mongoose = require('mongoose')
let { authenticateAsClient } = require('./../middleware/authenticate')
let { Application } = require('../models/application')

let router = express.Router()

let Route = {
	default: '/',
    userID: '/:id',
}

router.post(Route.userID, authenticateAsClient, (request, response) => {

    let application = new Application({
        _id: new mongoose.Types.ObjectId(),
        userID: request.body.userID,
        resumeURL: request.body.resumeURL,
        offerID: request.body.offerID,
        phone: request.body.phone,
        projects: request.body.projects
    })

    application.save().then((application) => {
        response.send(application)
    }, (error) => {
        response.status(400).send(error)
    })
})

router.get(Route.default, authenticateAsClient, (request, response) => {
	Application.find({}).then((applications) => {
		response.send({ applications })
	}, (error) => {
		response.status(400).send(error)
	})
})

module.exports = router
