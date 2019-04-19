const express = require('express')
const routes = require('./routes/')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const env = require('dotenv').load()


const app = express()
const router = express.Router()

const MONGO_INITDB_ROOT_USERNAME = "example" || process.env.MONGO_INITDB_ROOT_USERNAME
const MONGO_INITDB_ROOT_PASSWORD = "example" || process.env.MONGO_INITDB_ROOT_PASSWORD

// Here we define our url to the database, again could be remote or lcoal. In this example i will be using the Microsoft Azure invironment.
const databaseName = process.env.NODE_ENV === 'dev' ? 'database-test' : 'database'

const DBconnection = `mongodb://${databaseName}:27017?authMechanism=SCRAM-SHA-1&authSource=admin`

// lets connect to the mongo instance
try {
    mongoose.connect(DBconnection, {
        useNewUrlParser: true,
        reconnectTries: 60,
        reconnectInterval: 1000,
        auth: {
          user: MONGO_INITDB_ROOT_USERNAME,
          password: MONGO_INITDB_ROOT_PASSWORD
        }
      })
      .then((database) => {
        console.log('Connection to MongoDb successful')
        console.log(database)
        // app.locals.db = database.db('api')
      })
      .catch((err) => {
        console.log("Error connecting to database")
        console.error(err)
      });
} catch (error) {
    console.log(error)
}

let port = 5000 || process.env.PORT

// lets set out api endpoints
routes(router)

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())

app.use('/api', router)

// Lets start the server
// app.listen(port, () => {
//     console.log(`Server started on port: ${port}`)
// })

// Lets re-write the app listener to export
let server = app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});

module.exports = server