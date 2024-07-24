import express from 'express'
import APIContronller from '../controller/APIController'
let router = express.Router()

const initApiRoute = (app) => {
    router.get('/users', APIContronller.getAllUsers)
    router.post('/create-user', APIContronller.createNewUser)
    router.put('/update-user', APIContronller.updateUsernew)
    router.delete('/delete-user/:id', APIContronller.deleteUser)

    return app.use('/api/v1', router)
}

module.exports = initApiRoute