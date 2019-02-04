const express = require('express')
const routes = require('./routes/')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const env = require('dotenv').load()


const app = express()
const router = express.Router()

// Here we define our url to the database, again could be remote or lcoal. In this example i will be using the Microsoft Azure invironment.
const DBconnection = process.env.MONGODB_URI || "mongodb://f124a347-0ee0-4-231-b9ee:xQKvl4LlUpxH1xSvBTDFvtU2V2PPwf17CcJpXezzXXxJfrdGjt3Th5TgqUwjgJNgnwPhzmbX6dvmPXTKaV4J3Q%3D%3D@f124a347-0ee0-4-231-b9ee.documents.azure.com:10255/?ssl=true"


// lets connect to the mongo instance
try {
    mongoose.connect(process.env.COSMOSDB_CONNSTR+"?ssl=true&replicaSet=globaldb", {
        useNewUrlParser: true,
        auth: {
          user: process.env.COSMODDB_USER,
          password: process.env.COSMOSDB_PASSWORD
        }
      })
      .then(() => console.log('Connection to CosmosDB successful'))
      .catch((err) => console.error(err));
} catch (error) {
    console.log(error)
}

let port = 5000 || process.env.PORT

// lets set out api endpoints
routes(router)

app.use(cors())
app.use(bodyParser.json())
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