const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
require('./dbServer')

const coursesAvailableRouter = require('./routes/CoursesAvailableRouter')

const app = express();

const PORT = 3000

app.use(bodyParser.json())
app.use(cors());

app.use('/coursesAvailable', coursesAvailableRouter);

app.listen(PORT, () => {
    console.log("Server is running on port : " + PORT)
})